<template>
    <div class="createPost">
        <header class="headerPosts">
            <div id="logo">
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
            <div id = "create">
               <router-link to ="/createPost"> Ajouter une publication </router-link>
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
            <!-- <div class="headPost">
                <p> {{ post.date}} {{post.time}}<br>
                    {{post.lastName}} {{post.firstName}}<br>
                    <img :src="post.picture" :alt="post.id" class="image">
                </p>
            </div> -->
            <figure>
                <h2 class="title">{{ post.title }}</h2>
                <p>{{ post.postContent }}</p>
                <img :src="post.postArticle" :alt="post.id">
            </figure>
            <figcaption id ="allComments" v-for="comment in post.comments" :key="comment.id" >
                <p>{{ comment.comContent }}</p>
                <p>{{ comment.comArticle}}</p>
            </figcaption>  
        </section>
        <!-- <form id ="commentSection">
          <label for="comContent">Commenter</label>
            <textarea type="text" name="postContent" v-model="comContent" placeholder="commentaire..." id="postContent" maxlength="1000"></textarea>  
            <button type="button" id="postCreate" @click="postComment">Envoyer</button>
        </form> -->
        <div class= "buttonPost">
            <router-link to="/posts">
                <button class= "profile"><i class="fas fa-undo"></i>Retours aux publications</button>
            </router-link>
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
            post: {},
            comments:[]
        }
    },
      mounted() {
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(userInfo){
            this.isAdmin = userInfo.isAdmin;
            this.id = userInfo.id;
            this.firstName = userInfo.firstName;
            this.email =userInfo.email
            this.token = userInfo.token;
            this.postDetails();
            
        }
        else{
            this.$router.push({ name: 'login' });
        }
    },
     methods: {
        postDetails() {  
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
                        this.post = post; 

                    })
                }else {res.json ().then (() => {this.$router.push({ name: 'login' });})} 
            })
            .catch (() => {
                this.waiting=false;
                this.success= false;
                this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
            })  
        },
        disconnected() {
            localStorage.clear();
            this.$router.push({ name: 'login' });
        },
        modifyPost() {
             this.$router.push({ path:`/modifyPost/${this.$route.params.id}` });
            
        }
    },
} 
</script>

<style lang="scss">

.modify{
  height:auto;
  padding:10px;
  border-radius:8px;
  background:#0c0b50;
  font-weight:bold;
  font-size:20px;
  cursor:pointer;
  color:#e6dbd9;
  margin: 15px;
}
// #commentSection{
//     display: flex;
//     flex-flow: column;
//     justify-content: center;
//     align-items: center;
//     margin-top:15px;
// }


</style>