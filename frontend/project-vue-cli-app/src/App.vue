<template>
  <div id="app">
    <router-view/>
    <footer class= "footer">
        <p class= "copyright">{{copyright}} </p>
    </footer>
  </div>
</template>

<script>

export default {
  computed:{
      copyright(){
          const year = new Date().getFullYear()
          return `© Copyright Groupomania ${year}`
      }
  }
}
</script>

<style lang = "scss">

body
{
  padding: 0px;
  margin: 0px;
}

.header
{
  display: flex;
  justify-content: center;
}

h1
{
  color:white;   
}

.footer
{
  padding-bottom: 50px;
}

.copyright
{
  padding-top: 50px;
}

label
{
  font-size:22px;
  font-weight: bold;
  color:white;
  text-decoration: none;
}

input 
{
  margin:10px;
  height:24px;
}


a{
    font-size:15px;
    font-weight: bold;
    color:white;
    text-decoration: none;
    
    border-radius: 10px;
    display: inline-block;
    padding: 6px 12px;
    
  border: 2px solid  #D1515A;
  background-color:  #D1515A;   
}

#postsSection a
{
   
    border: 2px solid #0c0b50 ;
  
    background-color: #091F43;   
}
#create, .profile, .disconnexion {
  font-weight: bold;
  transform: scale(1);
  transition: all 400ms;
    &:hover {
      transform: scale(1.1);
      opacity: 0.6;
      cursor:pointer;
    }
}

li
{
    font-weight: bold;
    color: white;
    margin: 10px 20px;
    &:hover  {
      text-decoration: underline;
    }
    list-style:none;
}
#app, h2 
{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #e3e7eb;
  background: #091F43 ;
  padding-top: 5px;
  
}
figure
{
    background-color: white;
    border-radius: 10px;
    padding: 6px 12px;

    /* background:#e6dbd9; */
}

#erreur
{
  color:black;
}

#postArticle,#picture
{
    color: black;
} 

img
  {
    width: 80%;
  }

@media screen and (max-width:800px){
  #app
  {
    width: 100%;
  }
  
  h1 
  {
    padding: 4px;
  }
}
</style>
