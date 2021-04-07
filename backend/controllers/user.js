const bcrypt = require('bcrypt');//// Imporation du package bcrypt 
const jwt = require('jsonwebtoken');//// Importation du package jsonwebtoken 
const userManager = require('../models/manager/userManager');

const fs = require('fs');///// Importation du package file-system
const User = require('../models/entity/User');///// format modèle User

require('dotenv').config();/// Importation fichier de configuation 


// Inscription Utilisateur 
exports.signup = (req, res, next) => { 
  let user = new User();
  user.populate(req.body);
  user.hashPassword(req.body.password)
    .then(() => {
      userManager.save(user)
        .then(() => {
          res.status(201).json({ message: 'Utilisateur créé !' });
        })
    }).catch(error => res.status(500).json({ error }));
};

///// Connexion utilisateur 
exports.login = (req, res, next) => {
userManager.findOneEmail(req.body.email)
  .then(user => {
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      res.status(200).json({
        userId: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET_KEY, { expiresIn: '24h' })
      });
    })
    .catch(error => res.status(500).json({ error }));
  });
 
};
      

//// Obtenir un profil spécifique
exports.getOneUser = (req, res, next) => {
  userManager.findOne(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(400).json(err);
    })
};



////// Modification profil utilisateur 
exports.modifyUser =( req, res, next) =>{
  const userObject = req.file ?//// création de l'objet post et utilisation d'un opérateur ternaire pour mettre à jour l'URI de l'image
      {
        ...JSON.parse(req.body.user),
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//// Traitement de la nouvelle image 
      } : { ...req.body, picture: null };
  userManager.findOne(userObject.id)
      .then(user =>{
        if(user.userId == req.token.userId || req.token.isAdmin){
          userManager.updateOne({...userObject})
          .then(() => 
          {
            if (user.picture){
              const filename = user.picture.split('/images/')[1];
              fs.unlink(`images/${filename}`, () =>{res.status(200).json(user);});
            }else{
              res.status(200).json(user);
            }
          })
          .catch(error => res.status(400).json({ error }));
        }else{
          res.status(401).json({message :"Vous n'avez pas les droits pour modifier cet utilisateur"});
        }
    }).catch(error => res.status(400).json({ error }));
};


////// Suppression d'un utilisateur 
exports.deleteUser = (req, res, next) => {
  userManager.findOne(req.params.id)
    .then(user => {
      if(user.userId == req.token.userId || req.token.isAdmin){
        userManager.deleteOne(req.params.id)
        .then(() =>
         {
          if(user.picture) {
            const filename = user.picture.split('/images/')[1];
            fs.unlink(`images/${filename}`, () =>{res.status(200).json(user);});
          }else{
            res.status(200).json({message :"profil supprimé"});
          }
            
        })
       .catch(error => res.status(400).json({ error }));
      }else{
        res.status(401).json({message :"Vous n'avez pas les droits pour supprimer cet utilisateur"});
      }
  }).catch(error => res.status(400).json({ error }));
};
