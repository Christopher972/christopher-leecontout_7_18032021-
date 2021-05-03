<template>
  <div class="createPost">
        <header class="headerPost">
            <div id="logo">
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
            <nav id ="nav">
                <ul>
                    <li class ="profile"><router-link to = "/profile">Mon Profil</router-link>
                    <li class ="disconnexion" @click="disconnected">Déconnexion</li>
                </ul>
            </nav> 
        </header>
    <!-- Formulaire de modification de publication -->
        <div id ="formModifyPost">
            <form id="form" @submit.prevent="modifyPost()">
                <label for="title">Titre</label>
                <input type="text" name="title" v-model="post.title" placeholder="votre titre" id="title" minlength="8" maxlength= "49" required>
                <label for="postContent">Description</label>
                <textarea type="text" name="postContent" v-model="post.postContent" placeholder="votre contenu" id="postContent" maxlength="1000"></textarea>
                <label for="postArticle" class="fileUpload"><i class="fa fa-upload" aria-hidden="true"></i> Télécharger une image </label>
                <input @change ="checkImagePost()" type="file" ref="file" id="postArticle" name="postArticle" accept="image/*">
                <img :src="post.postArticle" :alt="post.id" class="image-preview_post"> 
                <input type="submit" id="postModify" value="Publier les changements">
            </form>
        </div>
        <div class ="buttonPost">
            <router-link to="/posts"> <button class = "profile"> <i class="fas fa-undo"></i> Retourner aux publications</button> </router-link>
            <button class="delete" @click= "deletePost()">Suprrimer publication</button>
            <p id="erreur" v-show="success===false"> Echec de la modification du Post : {{message}} </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modifyPost',
    data: function() {
      return {
        success: true, //affichage d'un message d'erreur si passe à false
        message :"", //message d'erreur
        id:"",
        firstName:"",
        token:"",
        postArticle:"" ,
        post: {},
        imageLoaded: false
      }
    },
    mounted() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
          this.id = userInfo.id;
          this.firstName = userInfo.firstName;
          this.email =userInfo.email
          this.token = userInfo.token;
          this.onePost();
            
        } else {
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
          onePost() {  //// Fonction appelée pour obtenir une publication spécifique 
            const dataGetPost = {
                method: 'GET',
                headers:{'Authorization':`Bearer ${this.token}`}
            };
            fetch(`http://localhost:3000/posts/${this.$route.params.id}`, dataGetPost)
            .then (res => {
                if (res.status == 200) {
                    res.json()
                    .then (post =>{
                        this.post = post;      
                    })
                } else {res.json ().then (() => {this.$router.push({ name: 'login' });})} 
            })
            .catch (() => {
                this.waiting=false;
                this.success= false;
                this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
            })  
        },
        checkImagePost() { //Fonction appelée pour visualiser l'image 
            let imageToCheckPost = this.$refs.file.files[0];
            if (imageToCheckPost) {
                const reader = new FileReader();
                this.imageToChecPost = true;
                reader.addEventListener("load", function() {
                document.getElementsByClassName('image-preview_post')[0].setAttribute("src", this.result);
            });
                reader.readAsDataURL(imageToCheckPost);
            }
           
        },
        modifyPost() { ///// Fonction appelée pour modifier la publication 
            const imageArticle = this.$refs.file.files[0];
            const post ={"id":this.post.id, "userId":this.id, "title":this.post.title, "postContent":this.post.postContent, "postArticle":this.post.postArticle };
            if (! imageArticle){
                var dataPost =null;
                dataPost = {
                    method: 'PUT',
                    body: JSON.stringify(post),
                    headers: {'content-type': 'application/json', 'Authorization':`Bearer ${this.token}`}
                }
            } else {
                let formData = new FormData();
                formData.append('post', JSON.stringify(post))
                formData.append('image', imageArticle);
                dataPost = {
                    method: 'PUT',
                    body: formData,
                    headers: {'Authorization':`Bearer ${this.token}`}
                }
                fetch(`http://localhost:3000/posts/${this.$route.params.id}`, dataPost) 
                .then (res => {
                    if (res.status == 200) {
                        res.json()
                        .then (post =>{
                            this.post = post;
                            this.success = true;
                            this.$router.push({ name: 'posts' })
                            alert('publication modifiée'); 
                        }) 

                    } else {
                         alert('Erreur' +  res.status  + '. Veuillez réessayer');
                    }
                })
                .catch (() => {
                    this.success= false;
                    this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
                }) 
            }     
        },
        deletePost() { //// Fonction appelée pour supprimer la publication sur l'interface 
            const dataDeletePost = {
                method: 'DELETE',
                headers:{'Authorization':`Bearer ${this.token}`}
            };
            let confirmation = confirm("Votre pulication sera supprimé définitivement sur l'interface");
            if (confirmation == true) {
                fetch(`http://localhost:3000/posts/${this.$route.params.id}`, dataDeletePost)   
                .then (res => {
                    if (res.status == 200) {
                        res.json()
                        .then (post =>{
                            this.post = post;
                             this.$router.push({ name: 'posts' });     
                        })
                    } else {
                         alert('Erreur' +  res.status  + '. Veuillez réessayer');
                    } 
                })
                .catch (() => {
                    this.waiting=false;
                    this.success= false;
                    this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
                })  
            }    
        },
        disconnected() {
            localStorage.clear();
            this.$router.push({ name: 'login' });
        } 
    },
} 
</script>

<style lang = "scss">
.headerPost
{
    display: flex;
    justify-content: space-between;
}

.image-preview_post
{
    width:45%;
}

.buttonPost
{
    display:flex;
    flex-flow:column-reverse;
    justify-content:center;
    align-items: center;
}

</style>
