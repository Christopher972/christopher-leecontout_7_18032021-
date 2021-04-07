const bd = require('../models/Bd');
const fs = require('fs');///// Importation du package file-system

const postManager = require('../models/manager/postManager');
const Post = require('../models/entity/Post');
const Comment = require('../models/entity/Comment');


////Creation d'une publication
exports.createPost = (req, res, next) => {
  const postObject = req.file ?//// création de l'objet post et utilisation d'un opérateur ternaire pour mettre à jour l'URI de l'image
    {
      ...JSON.parse(req.body.post),
      postArticle: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//// Traitement de la nouvelle image 
    } : { ...req.body, postArticle: null };
  postManager.save(postObject)
    .then(() => res.status(201).json({ message: 'Post crée avec succès' }))
    .catch(error => res.status(400).json({ error }));

};

// Modification d'une publication 
exports.modifyPost = (req, res, next) => {//// Exportation de la route put 
  const postObject = req.file ?//// création de l'objet post et utilisation d'un opérateur ternaire pour mettre à jour l'URI de l'image
    {
      ...JSON.parse(req.body.post),
      postArticle: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//// Traitement de la nouvelle image 
    } : { ...req.body, postArticle: null };
  postManager.findOne(postObject.id)
    .then(post => {
      if(post.userId == req.token.userId || req.token.isAdmin){
        postManager.updateOne({ ...postObject })
        .then(() => {
          if (post.postArticle) {
            const filename = post.postArticle.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { res.status(200).json(post); });
          } else {
            res.status(200).json(post);
          }
        })
        .catch(error => res.status(400).json({ error }));
      }else{
        res.status(401).json({message :"Vous n'avez pas les droits pour modifier ce post"});
      }
    }).catch(error => res.status(400).json({ error }));
};

//// Suppression d'un Post
exports.deletePost = (req, res, next) => {
  
  postManager.findOne(req.params.id)
  .then(post => {
    if(post.userId == req.token.userId || req.token.isAdmin){
      postManager.deleteOne(req.params.id)
      .then(() =>
        {
         if(post.postArticle) {
           const filename = post.postArticle.split('/images/')[1];
           fs.unlink(`images/${filename}`, () =>{res.status(200).json(post);});
         }else{
           res.status(200).json({message :"post supprimé"});
         }
           
       })
      .catch(error => res.status(400).json({ error }));
    } else{
      res.status(401).json({message :"Vous n'avez pas les droits pour supprimer ce post"});
    }  
  }).catch(error => res.status(400).json({ error }));
};

////// Affichage All Posts
exports.getAllPosts =(req, res, next) => {
  postManager.findAll()
  .then((result) => 
  res.status(200).json(result)
  )
  .catch(error => res.status(400).json({ error }));
};

////Creation d'un commentaire
exports.createComment = (req, res, next) => {
  const commentObject = req.file ?//// création de l'objet post et utilisation d'un opérateur ternaire pour mettre à jour l'URI de l'image
    {
      ...JSON.parse(req.body.comments),
      comArticle: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//// Traitement de la nouvelle image 
    } : { ...req.body, comArticle: null };
  postManager.save(commentObject)
    .then(() => res.status(201).json({ message: 'commentaire crée avec succès' }))
    .catch(error => res.status(400).json({ error }));

};

// Modification d'un commentaire 
exports.modifyComment = (req, res, next) => {//// Exportation de la route put 
  const commentObject = req.file ?//// création de l'objet post et utilisation d'un opérateur ternaire pour mettre à jour l'URI de l'image
    {
      ...JSON.parse(req.body.comments),
      comArticle: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//// Traitement de la nouvelle image 
    } : { ...req.body, comArticle: null };
  postManager.findOne(commentObject.id)
    .then(comments => {
      if(comments.userId == req.token.userId || req.token.isAdmin){
        postManager.updateOne({ ...commentObject })
        .then(() => {
          if (comments.comArticle) {
            const filename = comments.comArticle.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { res.status(200).json(comments); });
          } else {
            res.status(200).json(comments);
          }
        })
        .catch(error => res.status(400).json({ error }));
      }else{
        res.status(401).json({message :"Vous n'avez pas les droits pour modifier ce commentaire"});
      }
    }).catch(error => res.status(400).json({ error }));
};

//// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  
  postManager.findOne(req.params.id)
  .then(comments => {
    if(comments.userId == req.token.userId || req.token.isAdmin){
      postManager.deleteOne(req.params.id)
      .then(() =>
        {
         if(comments.comArticle) {
           const filename = post.postArticle.split('/images/')[1];
           fs.unlink(`images/${filename}`, () =>{res.status(200).json(comments);});
         }else{
           res.status(200).json({message :"commentaire supprimé"});
         }
           
       })
      .catch(error => res.status(400).json({ error }));
    } else{
      res.status(401).json({message :"Vous n'avez pas les droits pour supprimer ce commentaire"});
    }  
  }).catch(error => res.status(400).json({ error }));
};