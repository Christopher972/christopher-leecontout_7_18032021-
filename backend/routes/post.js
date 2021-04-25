const express = require('express'); /// Importation de l'application express
const router = express.Router(); //// Création du Routeur

const auth = require('../middleware/auth'); //// Importation du middleware d'authentification 
const multer = require('../middleware/multer-config'); //// Importation du middleware multer

const postCtrl = require('../controllers/post');////// Importation de la logique métier ddes routes 

//// Routes publication 
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth,  multer, postCtrl.modifyPost);
router.delete('/:id', auth,  postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);

//// Routes commentaires
router.post('/comment', auth, multer, postCtrl.createComment);
router.put('/:id/comment', auth, multer, postCtrl.modifyComment);
router.delete('/:id/comment', auth, postCtrl.deleteComment);
router.get('/:id/comment', auth, postCtrl.getAllComments);

module.exports = router; //// Exportation du router du fichier 
