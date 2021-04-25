const multer = require('multer');////Importation du package multer

const MIME_TYPES = {//// dictionnaire du MIME_TYPE
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Création de l'objet de configuration multer///
const storage = multer.diskStorage({//// Enregistrement de l'objet sur le disque 
      limits: {
        fileSize: 1000000, //1Mo
    },
      destination: (req, file, callback) => {/// Enregistrement des fichiers dans le dossier approprié 
        callback(null, 'images');
    },
      // Gestion des erreurs
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Le fichier doit etre un JPG'))
    }
    cb(undefined, true)
  },
      filename: (req, file, callback) => {////Indication du nom de fichier à utiliser
        const name = file.originalname.split(' ').join('_');//// Supression d'espaces dans un nom de fichier 
        const extension = MIME_TYPES[file.mimetype];/// Extension du fichier généré par le MIME_TYPE
      callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');////Exportation du middleware multer configuré