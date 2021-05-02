const bd = require('../Bd');
const User = require('../entity/User');

 /**
  * Inscription utilisateur sur l'interface
  * @param {User} user Inscription de l'utilisateur
  * @returns {User} Utilisateur inscrit
  */
exports.save = (user) => {
    return new Promise((resolve, reject) => {
        bd.execute('INSERT INTO user VALUES (NULL, ?, ?, ?, ?, NULL,0)', 
        [user.lastName, user.firstName, user.email, user.hash], 
        function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

/**
 * Récupère un utilisateur par son email
 * @param {String} email Email de l'utilisateur
 * @returns {User} L'utilisateur s'il a été trouvé 
 */
exports.findOneEmail = (email) => {
    return new Promise((resolve, reject) => {
        bd.execute('SELECT * FROM user WHERE email = ?', [email], 
        function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                if (result.length == 0) {
                    reject('Utilisateur non trouvé !')
                } else {
                    const user = new User(result[0]);
                    resolve(user);
                }
            };
        });
    });
};

/**
 * Récupère un profile utilisateur spécifique
 * @param {INT} id Profile spécifique
 * @returns {User} Profile utilisateur s'il a été trouvé
*/
exports.findOne = (id) => {
    return new Promise((resolve, reject) => {
        bd.execute('SELECT id, lastName, firstName, email, picture, isAdmin FROM user WHERE id = ?', [id], 
        function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                if (result.length == 0) {
                    reject("l'utilisateur est introuvable");
                } else {
                    const user = new User();
                    user.populate(result[0]);
                    resolve(user);
                }
            };
        });
    });
};

/**
 * Modification d'un profile spécifique
 * @param {User} user Modification profile utilisateur
 * @returns {User} Profil utilisateur modifié
 */
exports.updateOne = (user) => {
    return new Promise((resolve, reject) => {
        bd.execute('UPDATE user SET lastName = ?, firstName = ?,  picture = ?  WHERE id = ?', 
        [user.lastName, user.firstName, user.picture, user.id],
        function (updateErr, updateResult, updateFields) {
            if (updateErr) {
                reject(updateErr);
            } else {
                resolve("profil modifié");
            }
        });
    });
};

/**
 * Suppression utilisateur sur l'interface
 * @param {INT} id Suppression Profile utilisateur
 * @returns {sting} profile utilisateur supprimé
 */
exports.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        bd.execute('DELETE FROM user WHERE id =?', [id], function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                resolve("profil supprimé");
            }
        });
    });
};