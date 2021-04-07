
module.exports = class Post {

    constructor(values){
        this.populate(values);
    }

    populate(values){
        Object.assign(this, values);
    }
}