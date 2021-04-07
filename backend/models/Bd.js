require('dotenv').config();/// Importation fichier de configuation 
const mysql = require('mysql2');

////// Connexion à la DB my sql 
let connectBd = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
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