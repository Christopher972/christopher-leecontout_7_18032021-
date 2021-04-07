const express = require('express');///// Importation de l'application express
const router = express.Router();//// création du routeur 

const auth = require('../middleware/auth'); //// Importation du middleware d'authentification 
const multer = require('../middleware/multer-config'); //// Importation du middleware multer

const userCtrl = require('../controllers/user');//// Importation de la logique métier des routes 

///// Routes utilisateurs
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getOneUser);
router.put('/profile/:id', auth, multer, userCtrl.modifyUser);
router.delete('/profile/:id', auth, userCtrl.deleteUser);




module.exports = router;