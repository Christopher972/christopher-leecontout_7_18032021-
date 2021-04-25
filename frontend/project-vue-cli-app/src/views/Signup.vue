<template>
  <div class="signup">
    <header class="header">
      <div id="logo">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
    </header>
    <h1> Bienvenue sur le réseau social de Groupomania ! </h1>
    <h2> Veuillez créer un compte </h2>

    <!-- Formulaire de création de compte -->
    <form id="form" @submit.prevent="formSend">
      <label for="lastName">Nom</label>
      <input type="text" name="lastName" v-model="lastName" id="lastName">
      <p v-show="submitted && ! lastName" class="invalid-feedback">Un nom d'utilisateur est requis !</p>
      <label for="firstName">Prénom</label>
      <input  type="text" name="firstName" v-model="firstName" id="firstName">
      <p v-show="submitted && ! firstName" class="invalid-feedback">Un prénom d'utilisateur est requis !</p>
      <label for="e-mail">Adresse E-mail</label>
      <input type="email" name="email" v-model="email" id="email" required>
      <label for="password">Mot de Passe </label>
      <input  type="password" name="password" v-model="password" id="password">  
      <p v-show="submitted && ! password" class="invalid-feedback">Votre mot de passe doit contenir 8 caractères, au moins une Majuscule, une minuscule et un nombre !</p>
      <input type="submit" id="userSignup" value="Enregistrer">
    </form>
    <p id="erreur" v-show="success===false"> Echec de l'inscription : {{message}} </p>
    <div id="account">
    <p> Déjà un compte ? <router-link to="/login">Se connecter</router-link> </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data: function() {
    return {
      success: true, //affichage d'un message d'erreur si passe à false
      message :"", //message d'erreur
      lastName:"",
      firstName:"",
      email:"",
      password:"",
      submitted: false
    }
  },
  methods: {
    formSend(){
      const lastName = this.lastName;
      const firstName = this.firstName;
      const email = this.email;
      const password = this.password;
      this.submitted = true;
      const user ={"lastName":lastName, "firstName":firstName, "email":email, "password":password};
      const data = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
      };
      fetch("http://localhost:3000/auth/signup", data)
        .then (res => {
          if (res.status == 201) {
            this.success=true;
            this.$router.push({ name: 'login' });
            alert('Inscription réussi');
          }
          else {res.json ()
              .then (json => {
                this.success = false;
                this.message = json.error;
              }
            )}
          })
          .catch (() => {
            this.success= false;
            this.message = "Désolé, le serveur ne répond pas ! Veuillez réessayer ultérieurement";
          })
    }
  }
    
}
</script>

<style lang = "scss">

#form
{
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 10px;
}

#userSignup 
{
  margin:20px auto 0;
  height:auto;
  border:none;
  padding:10px;
  border-radius:8px;
  background:#e6dbd9;
  font-weight:bold;
  font-size:20px;
  cursor:pointer;
  color:#0c0b50;
}

.invalid-feedback
{
  color:red;
}

</style>
