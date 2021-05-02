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
        <h1>Hello {{ firstName }}, voici les dernières publications </h1>
        <span v-if = "posts.length < 1">Désolé aucune publication sur l'interface</span>
        <section id = "postsSection">
            <div  v-for="post in posts" :key="post.id">
                <div class="headPost">
                   <p> {{ post.lastName }} {{ post.firstName }}<br>
                        {{ post.date }} {{ post.time }}<br>  
                        <img :src="post.picture" :alt="post.id" class="imageProfil">
                    </p>
                   
                </div>
                <figure class ="figurePost">
                    <h2 class="title">{{ post.title }}</h2>
                    <p class="content">{{ post.postContent }}</p>
                    <img  v-if="post.postArticle" :src="post.postArticle" :alt="post.id"><br>
                    <router-link :to="{ name:'post', params: { id : post.id }}">Commentaires</router-link>
                </figure>
            </div>
        </section>
        <h3 id="erreur" v-show="success===false"> Echec de la requête : {{ message }} </h3>
    </div> 
</template>

<script>
export default {
    name: 'Posts',
    data: function() {
        return {
            success: true, //affichage d'un message d'erreur si passe à false
            message :"", //message d'erreur
            id:"",
            firstName:"",
            token:"",
            posts: []
        }
    },
    mounted() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            this.id = userInfo.id;
            this.firstName = userInfo.firstName;
            this.token = userInfo.token;
            this.getAllPosts();
        } else {
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
        getAllPosts() { /// Fonction appelée pour afficher toutes les publications 
            const data = {
                method: 'GET',
                headers:{'Authorization':`Bearer ${this.token}`}
            };
            fetch("http://localhost:3000/posts", data)
            .then (res => {
                if (res.status == 200) {
                    res.json()
                    .then (posts =>{
                        this.posts = posts;      
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
        disconnected() {
            localStorage.clear();
            this.$router.push({ name: 'login' });
        } 
    },     
}
</script>

<style lang="scss">

.headerPosts
{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.headPost
{
    display: flex;
   
}

.title
{
    color: white;
    border-radius: 8px;
    
}

section > div
{
    font-size:15px;
    font-weight: bold;
    color:white;
    text-decoration: none;
    border-radius: 10px;
    background-color: #D1515A;
    display: inline-block;
    padding: 6px 12px;
    width: 90%;
    margin-bottom: 20px;
}

.imageProfil
{
    width: 50px;
    height: 50px;
    border-radius: 200px;
}

.content
{
    color: black;
}
</style>


