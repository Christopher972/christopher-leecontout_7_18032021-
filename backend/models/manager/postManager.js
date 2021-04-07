const bd = require('../Bd');
const Post = require('../entity/Post');
const Comment = require('../entity/Comment');


/**
 * Publication d'un article sur l'interface
 * @param {Post} postObject Création d'un post
 * @returns {Post} Post créé
 */
///// Format création Post
exports.save =(postObject) =>{
    return new Promise((resolve, reject) =>{
        bd.execute('INSERT INTO post VALUES(NULL, ?, NOW(), ?, ?, ?)', [postObject.userId, postObject.title, postObject.postContent, postObject.postArticle], function (err, result, fields){
            if(err){
                reject(err);
            }else{
                resolve();
            }
        });  
    });
};

/**
 * Récupère un post spécifique
 * @param {INT} id Post spécifique
 * @returns {Post} Post utilisateur s'il a été trouvé
 */
exports.findOne =(id) =>{
    return new Promise((resolve, reject) => {
        bd.execute('SELECT * FROM post WHERE id = ?', [id], function (err, result, fields) {
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
exports.updateOne = (postObject) =>{
    return new Promise ((resolve, reject) =>{
        bd.execute('UPDATE post SET title = ?, postContent = ?, postArticle = ? WHERE id = ?', [postObject.title, postObject.postContent, postObject.postArticle, postObject.id],
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

/**
 * Affichage de toutes les publications sur l'interface
 * @returns {postObject} Affichage All Posts
 */
exports.findAll = () =>{
    return new Promise((resolve, reject) => {
        bd.execute("SELECT post.id, post.userId, DATE_FORMAT(DATE(post.date), '%d %M %Y' ) AS date, TIME(post.date) AS time, post.title, post.postContent, post.postArticle, user.lastName, user.firstName FROM post JOIN user ON post.userId = user.id ORDER BY post.date DESC;",
            function (err, result, fields) {
            if (err) {
                reject(err)
            } else {
               resolve(result);
            }
        })
   })

}

/**
 * /// Création d'un commentaire sur l'interface
 * @param {Comment} commentObject 
 * @returns {Comment} création d'un commentaire
 */
exports.save =(commentObject) =>{
    return new Promise((resolve, reject) =>{
        bd.execute('INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?, ?)', [commentObject.userId, commentObject.postId, commentObject.comContent, commentObject.comArticle], function (err, result, fields){
            if(err){
                reject(err);
            }else{
                resolve();
            }
        });  
    });
};

/**
 * Rècupère un commentaire spécifique
 * @param {INT} id  un commentaire spécifique d'un post
 * @returns {Comment} commentaire s'il a été trouvé
 */
exports.findOne =(id) =>{
    return new Promise((resolve, reject) => {
        bd.execute('SELECT * FROM comments WHERE id = ?', [id], function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                if (result.length == 0) {
                    reject("commentaire introuvable");
                } else {
                    const comments = new Comment();
                    comments.populate(result[0]);
                    resolve(comments);
                }

            }

        });

    });
};

/**
 * Modification d'un commentaire 
 * @param {Comment} commentObject Modification du commentaire
 * @returns {Comment} commentaire modifié
 */
exports.updateOne = (commentObject) =>{
    return new Promise ((resolve, reject) =>{
        bd.execute('UPDATE comments SET comContent = ?, comArticle = ? WHERE id = ?', [ commentObject.comContent, commentObject.comArticle, commentObject.id],
        function (updateErr, updateResult, updateFields) {
            if (updateErr) {
                reject(updateErr);
            } else {
                resolve("commentaire modifié");
            }
        });
        
    });
};

/**
 * Suppression d'un commentaire sur l'interface
 * @param {INT} id Suppresion d'un commentaire
 * @returns commentaire supprimé
 */
exports.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        bd.execute('DELETE FROM comments WHERE id = ?', [id], 
        function (deleteErr, deleteResult, deleteFields) {
            if (deleteErr) {
                reject(deleteErr);
            } else {
                resolve("commentaire supprimé");
            }

        });
    });
};
