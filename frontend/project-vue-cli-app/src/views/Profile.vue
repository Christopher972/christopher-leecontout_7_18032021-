<template>
    <div class="profil">
       <header class="headerProfile">
            <div id="logo">
                <img alt="Vue logo" src="../assets/logo.png">
            </div>
            <nav id="nav">
                <ul>
                    <li class="disconnexion" @click="disconnected">Déconnexion</li>
                </ul>
            </nav>
        </header>
       <h1>Hello {{ firstName }}, voici votre profil </h1>

        <!--Formulaire de modification du Pofil-->
        <form id="form" @submit.prevent="changeProfile()">
            <figure class= "figureProfile">
                <h2 class="title">Changer mon avatar</h2>
                    <img :src="user.picture" :alt="user.id" class="image-preview_profile"><br><br>
                <label for="picture">Choisissez votre avatar:</label><br> 
                <input type="file" id="picture" name="picture" ref="file" accept="image/*"  @change ="checkImage()"><br><br>
                <label for="lastName">Votre nom actuel:</label><br>
                <input type="text" name="lastName" id="lastName" placeholder="nom actuel" v-model="user.lastName"><br>
                <label for="firstName">Votre prénom actuel:</label><br>
                <input type="text" name="firstName" id="firstName" placeholder= "prénom actuel" v-model="user.firstName"><br>
                <input type="submit" id="modifyUser" value="Changer">
            </figure> 
        </form> 
         <div class="buttonPost">
            <router-link to="/posts" class = "profile"> <i class="fas fa-undo"></i> Retourner aux publications</router-link>
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
        getOneUser() { //// Fonction appelée pour obtenir un profil spécifique 
            const dataGetProfil = {
                method: 'GET',
                headers:{'Authorization':`Bearer ${this.token}`}
            };
            fetch(`http://localhost:3000/auth/profile/${this.id} `, dataGetProfil)
            .then (res => {
                if (res.status == 200) {
                     res.json()
                    .then( user => {
                        this.user = user; 
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
        checkImage() { //Fonction appelée pour visualiser l'avatar
            let imageToCheck = this.$refs.file.files[0];
            if (imageToCheck) {
                const reader = new FileReader();
                this.imageToCheck = true;
                reader.addEventListener("load", function() {
                document.getElementsByClassName('image-preview_profile')[0].setAttribute("src", this.result);
            });
                reader.readAsDataURL(imageToCheck);
            }   
        },
        changeProfile() { //////Fonction appelée pour modifier l'identité de l'utilisateur ou de la photo de profil
            const picture = this.$refs.file.files[0];
            const user = {"id":this.user.id, "lastName":this.user.lastName, "firstName":this.user.firstName, "picture":this.user.picture };
            var dataProfil = null;
            if (! picture) {
                dataProfil = {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {'content-type': 'application/json', 'Authorization':`Bearer ${this.token}`}
            }   
            } else {
                let formData = new FormData();
                formData.append('user', JSON.stringify(user));
                formData.append('image', picture);
                dataProfil = {
                    method: 'PUT',
                    body: formData,
                    headers: {'Authorization':`Bearer ${this.token}`}
                }
            }
            fetch(`http://localhost:3000/auth/profile/${this.id}`, dataProfil) 
            .then (res => {
                if (res.status == 200) {
                    res.json()
                    .then( user => {
                        this.user = user;
                        this.success = true;
                        this.$router.push({ name: 'posts' })
                    })  
                } else {
                   this.success=false;
                   this.message = "Veuillez réessayer";
                }
            })
            .catch (() => {
                this.success = false;
                this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
            })         
        },
        deleteUser() { //////Fonction appelée pour supprimer un profil spécifique sur l'interface 
            const dataDeleteProfil = {
                method: 'DELETE',
                headers:{'Authorization':`Bearer ${this.token}`}
            };
            let confirmation = confirm("Votre compte sera supprimé définitivement sur l'interface");
            if (confirmation == true) {
                fetch(`http://localhost:3000/auth/profile/${this.id} `, dataDeleteProfil)
                .then (res => {
                    if (res.status == 200) {
                        res.json()
                        .then( user => {
                            this.user = user;
                            this.$router.push({ name: 'login' })
                        })        
                    } else { 
                        this.success=false;
                        this.message = "Veuillez réessayer";
                    } 
                })
                .catch (() => {
                    this.success = false;
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

.headerProfile 
{
    display: flex;
    justify-content: space-between;
}

.figureProfile
{
    border-radius: 10px;
    padding: 6px 12px;  
    background-color: #D1515A;
}

.image-preview_profile
{
    height: 100px;
    width: 100px;
    border:2px solid #091F43;
    border-radius: 200px;
}

.button
{
    display:flex;
    flex-flow:column-reverse;
    justify-content:center;
    align-items: center;
}

</style>