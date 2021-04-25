const bd = require('../Bd');
const Comment = require('../entity/Comment');

/**
 * /// Création d'un commentaire sur l'interface
 * @param {Comment} commentObject 
 * @returns {Comment} création d'un commentaire
 */
exports.save =(comment) =>{
    return new Promise((resolve, reject) =>{
        bd.execute('INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?, ?)', 
        [comment.userId, comment.postId, comment.comContent, comment.comArticle], 
        function (err, result, fields){
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
exports.find =(id) =>{
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
exports.update = (commentObject) =>{
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
exports.delete = (id) => {
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

/**
 * Affichage de toutes les publications sur l'interface
 * @returns {commentObject} Affichage All Posts
 */
 exports.findAllComments = (id) =>{
    return new Promise((resolve, reject) => {
        bd.execute("SELECT comments.id, comments.userId, comments.postId, DATE_FORMAT(DATE(comments.date), '%d %M %Y' ) AS date, TIME(comments.date) AS time, comments.comContent, comments.comArticle, user.lastName, user.firstName FROM comments INNER JOIN user ON comments.userId = user.id WHERE comments.postId = ? ORDER BY date DESC",
            [id],
            function (err, result, fields) {
            if (err) {
                reject(err)
            } else {
               resolve(result);
            }
        });
   });

};