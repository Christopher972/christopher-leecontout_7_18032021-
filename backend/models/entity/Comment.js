module.exports = class Comment {

    constructor(values){
        this.populate(values);
    }

    populate(values){
        Object.assign(this, values);
    }
}