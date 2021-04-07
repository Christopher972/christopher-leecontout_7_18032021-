const express = require('express'); /// Importation du framework express
const helmet = require('helmet'); //// Importation du package helmet
const path = require('path'); ///// Importation de path pour donner accès au chemin du système de fichiers 


const userRoutes = require('./routes/user'); ///// Importation du Router user 
const postRoutes = require('./routes/post'); //// Importation du Router post

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); /// accéder à l'API depuis n'importe quelle origine 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');////Ajout des headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');// Pour envoyer des requêtes avec les méthodes mentionnées 
    next();
});


app.use(express.json()); /// Transformation du corps de la requête en objet json
app.use(helmet()); ////// Sécurisation des en-têtes HTTP
app.use('/images', express.static(path.join(__dirname, 'images')));///  Gestionnaire de routage 

app.use('/auth', userRoutes );/// enregistrement du routeur pour toutes les demandes efectuées vers /api/users 
app.use('/posts', postRoutes );/// enregistrement du routeur pour toutes les demandes efectuées vers /api/users 
module.exports = app;

