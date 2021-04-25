<template>
    <div class="profil">
       <header class="headerProfile">
            <div id="logo">
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
            <nav id ="nav">
                <ul>
                    <li class ="disconnexion" @click="disconnected">Déconnexion</li>
                </ul>
            </nav>
        </header>
       <h1>Hello {{ firstName }}, voici votre profil </h1>
        <form id="form" @submit.prevent="changeProfile()">
            <figure>
                <h2 class="title">Changer mon avatar</h2>
                    <img :src="user.picture" :alt="user.id" class="image-preview_profile"><br><br> 
                <label for="picture">Choisissez votre avatar:</label><br> 
                <input type="file" id="picture" name="picture" ref="file" accept="image/*"  @change ="checkImage()"><br><br>
                <label for="lastName">Votre nom actuel:</label><br>
                <input type="text" id="lastName" placeholder="nom actuel" v-model="user.lastName"><br>
                <label for="lastName">Votre prénom actuel:</label><br>
                <input type="text" id="firstName" placeholder= "prénom actuel" v-model="user.firstName"><br>
                <input type="submit" id="modifyUser" value="Changer">
            </figure> 
        </form> 
         <div class="button">
            <router-link to="/posts">
                <button class= "profile"><i class="fas fa-undo"></i>Retours aux publications</button>
            </router-link>
            <button class="delete" @click= "deleteUser()">Suprrimer Utlisateur</button>     
            <h3 id="erreur" v-show="success===false"> Echec de la requête : {{message}} </h3>
        </div>  
    </div>
</template>
<script>
export default {
    name: 'Profile',
    data: function() {
        return {
            success: true, //affichage d'un message d'erreur si passe à false
            message :"", //message d'erreur
            firstName:"",
            picture:"",
            id:"",
            token:"",
            user:{},
            imageLoaded: false
        }
    },
    mounted() {
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(userInfo){
            this.picture = userInfo.picture;
            this.id = userInfo.id;
            this.firstName = userInfo.firstName;
            this.email =userInfo.email
            this.token = userInfo.token;
            this.getOneUser();
            
        }
        else{
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
        getOneUser() {
            const data = {
                method: 'GET',
                headers:{'Authorization':`Bearer ${this.token}`}
            };
            fetch(`http://localhost:3000/auth/profile/${this.id} `, data)
            .then (res => {
                if (res.status == 200) {
                    res.json()
                    .then (user =>{
                        this.user = user;      
                    })
                }else {res.json ().then (() => {this.$router.push({ name: 'login' });})} 
            })
            .catch (() => {
                this.waiting=false;
                this.success= false;
                this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
            })  
        },
        deleteUser(){
            const data = {
                method: 'DELETE',
                headers:{'Authorization':`Bearer ${this.token}`}
            };
            let confirmation = confirm("Votre compte sera supprimé définitivement sur l'interface");
            if(confirmation == true) {
                fetch(`http://localhost:3000/auth/profile/${this.id} `, data)
                .then (res => {
                    if (res.status == 200) {
                        res.json()
                        .then (user =>{
                            this.user = user;      
                        })
                    }else {res.json ().then (() => {this.$router.push({ name: 'login' });})} 
                })
                .catch (() => {
                    this.waiting=false;
                    this.success= false;
                    this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
                })  
            }    
        },
        checkImage(){
            let imageToCheck = this.$refs.file.files[0];
            if(!imageToCheck || imageToCheck.type.indexOf('image/') !== 0) {
                this.imageLoaded = false;
                return;
            }
            if(imageToCheck) {
                const reader = new FileReader();
                this.imageLoaded = true;
                this.imageToCheck = true;
                reader.addEventListener("load", function() {
                document.getElementsByClassName('image-preview_profile')[0].setAttribute("src", this.result);
            });
                reader.readAsDataURL(imageToCheck);
            }
            else {this.imgIsChecked=false;}
        },
        changeProfile(){
        const picture = this.$refs.file.files[0];
        const user = {"id":this.user.id, "lastName":this.user.lastName, "firstName":this.user.firstName, "picture":this.user.picture };
        if(! picture){
            const data = {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {'content-type': 'application/json', 'Authorization':`Bearer ${this.token}`}
            }
            fetch(`http://localhost:3000/auth/profile/${this.id}`, data)
                .then (res => {
                    if (res.status == 200) {
                        res.json()
                        .then (user =>{
                            this.user = user;
                            this.success=true;
                            this.$router.push({ name: 'posts' });
                            alert('profil modifié')
                        })
                    }else {
                    res.json ()
                        .then (json => {
                            this.success = false;
                            this.message = json.error;
                        })
                    }
                })
                .catch (() => {
                    this.success= false;
                    this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
                }) 
            }else{
                let formData = new FormData();
                formData.append('user', JSON.stringify(user))
                formData.append('image', picture);
                const data = {
                    method: 'PUT',
                    body: formData,
                    headers: {'Authorization':`Bearer ${this.token}`}
                }
                fetch(`http://localhost:3000/auth/profile/${this.id}`, data) 
                .then (res => {
                    if (res.status == 200) {
                        res.json()
                        .then (user =>{
                            this.user = user;
                            this.success = true;
                            this.$router.push({ name: 'posts' })
                            alert('profile modifié'); 
                        }) 
                    }else {
                        res.json ()
                        .then (json => {
                            this.success = false;
                            this.message = json.error;
                        })
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
    },
}
</script>
<style lang="scss">
.headerProfile {
    display: flex;
    justify-content: space-between;
}
.image-preview_profile{
    width: 40%;
    border:2px solid black;
    border-radius: 200px;
}
#modifyUser, .delete{
  height:auto;
  padding:10px;
  border-radius:8px;
  background:#0c0b50;
  font-weight:bold;
  font-size:20px;
  cursor:pointer;
  color:#e6dbd9;
}
.button{
    display:flex;
    flex-flow:column-reverse;
    justify-content:center;
    align-items: center;
}

.delete{
    margin:15px;
}


</style>