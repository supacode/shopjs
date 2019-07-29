const getDb = require('../util/db').getDb;
const mongodb = require('mongodb');
class Product {
  constructor(name, price, description, imageUrl, id, userId) {
    this.name = name;
    this.price = +price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.user = userId
  }


  save() {
    const db = getDb();
    let action;

    if (this._id) {
      //  Update the Product
      action = db.collection('products').updateOne({
        _id: this._id
      }, {
        $set: this
      });
    } else {
      // Insert new Product
      action = db.collection('products').insertOne(this);
    }


    return action
      .then(result => result)
      .catch(err => {
        console.log(err)
      });
  }

  static fetchAll() {

    const db = getDb();

    return db.collection('products').find().toArray()
      .then(products => products)
      .catch(err => console.log(err));
  }

  static findById(_id) {
    const db = getDb();

    _id = new mongodb.ObjectId(_id); // Construct a new MongoDB ObjectId

    return db.collection('products').findOne({
        _id
      })
      .then(product => product)
      .catch(err => {
        console.log(err);
      })
  }

  static delete(_id) {
    const db = getDb();
    _id = new mongodb.ObjectId(_id); // Construct a new MongoDB ObjectId
    db.collection('products').deleteOne({
        _id
      })
      .then(result => result)
      .catch(err => console.log(err))
  }
}

module.exports = Product;