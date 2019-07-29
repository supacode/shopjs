const getDb = require('../util/db').getDb;
const mongodb = require('mongodb');

class User {

    constructor(username, email) {
        this.username = username;
        this.email = email;
    }


    save() {

        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findById(id) {

        const db = getDb();

        const _id = new mongodb.ObjectId(id);



        return db.collection('users').findOne({
                _id
            }).then(user => user)
            .catch(err => console.log(err))

    }


}


module.exports = User;