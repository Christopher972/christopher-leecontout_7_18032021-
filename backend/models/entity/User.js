const bcrypt = require('bcrypt');//// Imporation du package bcrypt 

module.exports = class User {
    constructor(values){
        this.populate(values);       
    }
    populate(values){
        Object.assign(this, values);
    }
    hashPassword(){
     return bcrypt.hash(this.password, 10)
         .then(hash =>{
            this.hash = hash;
        })       
    }
};
