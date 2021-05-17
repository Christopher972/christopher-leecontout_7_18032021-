<template>
    <div class="createPost">
        <header class="headerPosts">
            <div id="logo">
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
            <div id = "create">
               <router-link to ="/createPost">Ajouter une publication</router-link>
            </div>
            <nav id ="nav">
                <ul>
                    <li class ="profile"><router-link to = "/profile">Mon Profil</router-link>
                    <li class ="disconnexion" @click="disconnected">Déconnexion</li>
                </ul>
            </nav>
        </header>
        <h1>Hello {{ firstName }}, voici les détails de la publication</h1>
        <section id = "postsSection">
            <div>
                <div class= "headPost">
                    <p> {{ post.lastName }} {{ post.firstName }}<br>
                        {{ post.date }} {{ post.time }}<br>  
                        <img :src="post.picture" :alt="post.id" class="imageProfil">
                    </p>
                </div>
                 <figure class="figurePost">
                    <h2 class="title">{{ post.title }}</h2>
                    <p class="content">{{ post.postContent }}</p>
                    <img :src="post.postArticle" :alt="post.id">
                </figure>
                 <span id="notComment" v-if="!post.hasComment">Désolé aucun commentaire concernant ce post</span>
                <div class="figurePostComment" v-if="post.hasComment">
                    <figcaption id ="allComments" v-for="comment in post.comments" :key="comment.id">
                        <div class ="headPost">
                            <p class="contentCom">{{ comment.date }} {{ comment.time }}<br>
                                {{ comment.lastName }} {{ comment.firstName }}<br>
                                <img :src="comment.picture" :alt="comment.id" class="imageProfil">
                            </p>
                        </div>
                        <div class ="textContent">
                            <p class="contentCom">{{ comment.comContent }}</p>
                            <img  v-if="comment.comArticle" :src="comment.comArticle" :alt="comment.id" class="imageCom"><br>
                            <button class="delete" v-if="comment.canUpdate"  @click= "deleteComment(comment.id)" :data-id="comment.id">Supprimer Commentaire</button>
                        </div>
                    </figcaption>  
                </div>
            </div> 
        </section>
        <div id ="formCreateCom">
            <form id="form" @submit.prevent="createCom()">
                <label for="comContent">Commenter</label>
                <textarea type="text" name="comContent" v-model="comments.comContent" placeholder="saisissez votre commentaire..." id="comContent" maxlength="1000"></textarea>
                <label for="comArticle" class="fileUpload"><i class="fa fa-upload" aria-hidden="true"></i> Télécharger une image </label>
                <input @change ="checkImageCom()" type="file" ref="file" id="comArticle" name="comArticle" accept="image/*">
                <div class="image-preview" v-if="imageLoaded===true">
                    <img src="" alt="aperçu de l'image" class="image-preview_com"> 
                </div>
                <input type="submit" id="createCom" value="Envoyer">
            </form>
        </div>
        <div class= "buttonPost">
            <router-link to="/posts" class= "profile"> <i class="fas fa-undo"></i>Retourner aux publications</router-link>
            <button class="modify" v-if="post.canUpdate" @click= "modifyPost()">Modifier Publication</button>
            <h3 id="erreur" v-show="success===false"> Echec de la requête : {{message}} </h3>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'Post',
    data: function() {
        return {
            success: true, //affichage d'un message d'erreur si passe à false
            message :"", //message d'erreur
            id:"",
            firstName:"",
            token:"",
            comArticle:"",
            isAdmin: "",
            post: {},
            comments:[],
            imageLoaded: false
        }
    },
      mounted() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            this.isAdmin = userInfo.isAdmin;
            this.id = userInfo.id;
            this.firstName = userInfo.firstName;
            this.token = userInfo.token;
            this.postDetails();
            
        }
        else {
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
        postDetails() { /// Fonction appelée pour obtenir une publication spécifique 
            const dataGetPost = {
                method: 'GET',
                headers:{'Authorization':`Bearer ${this.token}`}
            };
            this.postId = this.$route.params.id;
            fetch(`http://localhost:3000/posts/${this.postId}`, dataGetPost)
            .then (res => {
                if (res.status == 200) {
                    res.json()
                    .then (post =>{
                        post.canUpdate = post.userId == this.id || this.isAdmin;
                        post.hasComment = post.comments.length > 0;
                        for (let comment of post.comments) {
                            comment.canUpdate = comment.userId == this.id || this.isAdmin;
                        }
                        this.post = post; 

                    })
                } else {
                    alert('Erreur' +  res.status  + '. Veuillez réessayer');
                } 
            })
            .catch (() => {
                this.success = false;
                this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
            })  
        },
        checkImageCom() { //Fonction appelée pour prévisualiser l'image du commentaire
            let imageToCheckCom = this.$refs.file.files[0];
            if (! imageToCheckCom || imageToCheckCom.type.indexOf('image/') !== 0) {
                this.imageLoaded = false;
                return;
            }
            if (imageToCheckCom) {
                const reader = new FileReader();
                this.imageLoaded = true;
                this.imageToCheckCom = true;
                reader.addEventListener("load", function() {
                document.getElementsByClassName('image-preview_com')[0].setAttribute("src", this.result);
            });
                reader.readAsDataURL(imageToCheckCom);
            } else {this.imageLoaded=false;}
        },
        createCom() { /// Fonction appelée lors de la création d'un commentaire
            const imageComment = this.$refs.file.files[0];
            const comments = {"userId":this.id, "postId":this.postId, "comContent":this.comments.comContent, "comArticle":this.comments.comArticle };
            var dataComment = null;
            if (! imageComment) {
                dataComment = {
                    method: 'POST',
                    body: JSON.stringify(comments),
                    headers: {'content-type': 'application/json', 'Authorization':`Bearer ${this.token}`}
                }
            } else {
                let formData = new FormData();
                formData.append('comments', JSON.stringify(comments));
                formData.append('image', imageComment);
                dataComment = {
                    method: 'POST',
                    body: formData,
                    headers: {'Authorization': `Bearer ${this.token}`}
                }
            } 
            fetch("http://localhost:3000/comment", dataComment)
            .then (res => {
                if (res.status == 201) {
                    res.json()
                        .then(comments =>{
                            this.comments =comments;
                            this.success=true;
                            this.$router.push({ name: 'posts' });
                        }) 
                } else {
                     alert('Erreur' +  res.status  + '. Veuillez réessayer');
                }
            })
            .catch (() => {
                this.success= false;
                this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
            })     
        },
        modifyPost() {/// Redirection pour modifier ou une publication 
             this.$router.push({ path:`/modifyPost/${this.$route.params.id}` });    
        },
        deleteComment(id) {////// Fonction appelée pour supprimer un commentaire spécifique sur l'interface 
            const dataDeleteComment = {
                method: 'DELETE',
                headers:{'Authorization':`Bearer ${this.token}`}
            };
            let confirmation = confirm("Votre commentaire sera supprimé définitivement sur l'interface");
            if (confirmation == true) {
                fetch(`http://localhost:3000/comment/${id}`, dataDeleteComment)   
                .then (res => {
                    console.log(res);
                    if (res.status == 200) {
                        res.json()
                        .then (comments =>{
                            this.comments = comments;
                            this.$router.push({ name: 'posts' });     
                        })
                    } else {
                        this.success=false;
                        this.message = "Veuillez réessayer";
                    }
                })
                .catch (() => {
                    this.success= false;
                    this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
                })  
            } 
        },
        disconnected() {
            localStorage.clear();
            this.$router.push({ name: 'login' });
        } 
    }
} 
</script>

<style lang="scss">

.figurePostComment
{
    background-color: rgba(255, 255, 255, 0.904);
    border-radius: 20px;
    margin: 37px;
    padding: 4px;
    transform: translate(0px, -20px);
}

.contentCom{
    color: black;
    text-align: left;
    padding: 5px;
}

.textContent
{
    background-color: white;
    border-radius: 10px;
    transform: translate(0px, -30px);
}

figcaption
{
    padding: 5px;
}

.imageCom
{
    width:50%;
    text-align: center;
}

@media screen and (max-width:800px){
.figurePostComment
  {
    margin: 1px;
    transform: translate(0px, 2px);
  }
}
</style>