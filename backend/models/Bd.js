require('dotenv').config();/// Importation fichier de configuation 
const mysql = require('mysql2');

////// Connexion à la BD my sql 
let connectBd = mysql.createConnection({
    database: process.env.BD_NAME,
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS
});
connectBd.connect(
    function(err){
    if (err){
        console.log("Erreur de connexion !");
     throw err;
    } else{
        console.log("Connecté à mysql !");
    }
});

module.exports = connectBd;