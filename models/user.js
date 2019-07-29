const getDb = require('../util/db').getDb;
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {

    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }




    addToCart(product) {


        const cartProductIndex = this.cart.items.findIndex(cartProd => cartProd.productId.toString() === product._id.toString());


        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        }


        const updatedCart = {
            items: updatedCartItems
        };


        const db = getDb();
        return db.collection('users').updateOne({
            _id: new ObjectId(this._id)
        }, {
            $set: {
                cart: updatedCart
            }
        });


    }


    save() {

        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findById(id) {

        const db = getDb();

        const _id = new ObjectId(id);



        return db.collection('users').findOne({
                _id
            }).then(user => user)
            .catch(err => console.log(err))

    }


}


module.exports = User;