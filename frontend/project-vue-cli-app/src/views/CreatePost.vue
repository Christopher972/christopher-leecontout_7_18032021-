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
    <h1>Veuillez créer votre publication</h1>
    
    <!-- Formulaire de création de publication -->
    <div id ="formCreatePost">
        <form id="form" @submit.prevent="createPost()">
            <label for="title">Titre</label>
            <input type="text" name="title" v-model="title" id="title" minlength="8" maxlength= "49" required>
            <label for="postContent">Description</label>
            <textarea type="text" name="postContent" v-model="postContent" placeholder="ajoutez votre contenu..." id="postContent" maxlength="1000"></textarea>
            <label for="postArticle" class="fileUpload"><i class="fa fa-upload" aria-hidden="true"></i> Télécharger une image </label>
            <input @change ="loadImagePreview()" type="file" ref="file" id="postArticle" name="postArticle" accept="image/*">
            <div class="image-preview" v-if="imageLoaded===true">
                <img src="" alt="aperçu de l'image" class="image-preview_image"> 
            </div>
            <input type="submit" id="postCreate" value="Publier">
        </form>
    </div>
    <div class ="buttonPost">
        <router-link to="/posts" class= "profile"><i class="fas fa-undo"></i>Retourner aux publications </router-link>
    </div>
    <p id="erreur" v-show="success===false"> Echec de la création du Post : {{message}} </p>
  </div>
</template>

<script>
export default {
  name: 'CreatePost',
  data: function() {
    return {
      success: true, //affichage d'un message d'erreur si passe à false
      message :"", //message d'erreur
      id:"",
      title:"",
      postContent:"",
      postArticle:"" , 
      imageLoaded: false,
      token:""
    }
},

mounted() { 
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            this.id = userInfo.id;
            this.token = userInfo.token;
        }
        else {
            this.$router.push({ name: 'login' });
        }
    },
methods: {
    loadImagePreview() {//Fonction appelée pour prévisualiser l'image 
     let imageUpload = this.$refs.file.files[0];
        if (! imageUpload || imageUpload.type.indexOf('image/') !== 0) {
            this.imageLoaded = false;
            return;
        }
        if (imageUpload) {
            const reader = new FileReader();
            this.imageUpload = true;
            this.imageLoaded = true;
            reader.addEventListener("load", function() {
            document.getElementsByClassName('image-preview_image')[0].setAttribute("src", this.result);
        });
            reader.readAsDataURL(imageUpload);
        } else {
            this.imageLoaded=false;
        }
    },
    createPost() { /// Fonction appelée lors de la création d'une publication 
        const imageArticle = this.$refs.file.files[0];
        const post = {"userId":this.id, "title":this.title, "postContent":this.postContent, "postArticle":this.postArticle };
        var data = null;
        if (! imageArticle){
                data = {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {'content-type': 'application/json', 'Authorization':`Bearer ${this.token}`}
            }
        } else {
            let formData = new FormData();
            formData.append('post', JSON.stringify(post));
            formData.append('image', imageArticle);
            data = {
                method: 'POST',
                body: formData,
                 headers: {'Authorization': `Bearer ${this.token}`}
            }
        }
        fetch("http://localhost:3000/posts", data)
            .then (res => {
                if (res.status == 201) {
                    res.json()
                        .then(post =>{
                            this.post = post;
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

.image-preview_image{
    width:55%;
}
 
.posts
{
    font-weight: bold;
}

</style>
