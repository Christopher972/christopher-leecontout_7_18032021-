const bd = require('../Bd');
const Post = require('../entity/Post');

/**
 * Publication d'un article sur l'interface
 * @param {Post} post Création d'un post
 * @returns {Post} Post créé
 */
exports.create = (post) => {
    return new Promise((resolve, reject) => {
           bd.execute('INSERT INTO post VALUES(NULL, ?, NOW(), ?, ?, ?)', 
           [post.userId, post.title, post.postContent, post.postArticle], 
           function (err, result, fields) {
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });  
    })
};

/**
 * Affichage de toutes les publications sur l'interface
 * @returns {postObject} Affichage All Posts
 */
 exports.findAll = () =>{
    return new Promise((resolve, reject) => {
        bd.execute("SELECT post.id, post.userId, DATE_FORMAT(DATE(post.date), '%d %M %Y' ) AS date, TIME(post.date) AS time, post.title, post.postContent, post.postArticle, user.lastName, user.firstName, user.picture FROM post JOIN user ON post.userId = user.id ORDER BY post.date DESC;",
            function (err, result, fields) {
            if (err) {
                reject(err)
            } else {
               resolve(result);
            }
        });
    });
};

/**
 * Récupère un post spécifique
 * @returns {Post} Post utilisateur s'il a été trouvé
 */
exports.findOne = (id) => {
    return new Promise((resolve, reject) => {
        bd.execute("SELECT post.id, post.userId, DATE_FORMAT(DATE(post.date), '%d %M %Y' ) AS date, TIME(post.date) AS time, post.title, post.postContent, post.postArticle, user.lastName, user.firstName, user.picture FROM post JOIN user ON post.userId = user.id WHERE post.id = ?;", [id],
        function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                if (result.length == 0) {
                    reject("post introuvable");
                } else {
                    const post = new Post();
                    post.populate(result[0]);
                    resolve(post);
                }
            }
        });
    });
};

/**
 * Modification d'une publication 
 * @param {Post} postObject Modification du Post
 * @returns {Post} Post modifié
 */
exports.updateOne = (post) =>{
    return new Promise ((resolve, reject) =>{
        bd.execute('UPDATE post SET title = ?, postContent = ?, postArticle = ? WHERE id = ?', [post.title, post.postContent, post.postArticle, post.id],
        function (updateErr, updateResult, updateFields) {
            if (updateErr) {
                reject(updateErr);
            } else {
                resolve("post modifié");
            }
        });   
    });
};

/**
 * Suppression d'une publication sur l'interface
 * @param {INT} id Suppression du post
 * @returns {string} Post supprimé
 */
exports.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        bd.execute('DELETE FROM post WHERE id = ?', [id], 
        function (deleteErr, deleteResult, deleteFields) {
            if (deleteErr) {
                reject(deleteErr);
            } else {
                resolve("post supprimé");
            }
        });
    });
};

