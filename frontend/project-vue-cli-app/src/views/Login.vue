<template>
  <div class="login">
    <header class="header">
      <div id="logo">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
    </header>
    <h1> Bienvenue sur le réseau social de Groupomania ! </h1>
    <h2> Veuillez vous identifiez pour vous connecter </h2>

    <!--Formulaire de connexion de compte-->
    <form id="form" @submit.prevent="formSend">
       <label for="e-mail">Adresse E-mail</label>
      <input type="email" name="e-mail" v-model="email" id="e-mail" required>
      <label for="password">Mot de Passe </label>
      <input  type="password" name="password" v-model="password" id="password">  
      <p v-show="submitted && ! password" class="invalid-feedback">Un mot de passe est requis !</p>
      <input type="submit" id="userSignup" value="Connexion">
    </form>
    <h3 id="erreur" v-show="success===false"> Echec de la connexion : {{message}}</h3>
    <div id="account">
      <p>Pas encore de compte ?<router-link to="/">Créer un compte</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
      success: true, //affichage d'un message d'erreur si passe à false
      message :"", //message d'erreur
      email:"",
      password:"",
      submitted: false
    }
  },
  methods: {
    formSend() { //Fonction appelée lors de la soumission du formulaire à l'API
      this.submitted = true;
      const data = {
        method: 'POST',
        body: JSON.stringify({"email":this.email, "password": this.password}),
        headers: {'Content-Type': 'application/json'}
      };
      fetch("http://localhost:3000/auth/login", data)
      .then (res => {
        if (res.status == 200) {res.json ()
          .then (user => {
            this.success = true;
            const userInfo = {"id": user.userId, "firstName": user.firstName, "email": user.email, "isAdmin": user.isAdmin, "token": user.token}
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            this.$router.push({ name: 'posts' });
          }) 
        }
        else {
          this.success=false;
          this.message = "Veuillez réessayer";
        }
      })
      .catch (() => {
        this.success= false;
        this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
      })
    }
  } 
}
</script>

