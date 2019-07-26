const getDb = require('../util/db').getDb;
const mongodb = require('mongodb');
class Product {
  constructor(name, price, description, imageUrl, id) {
    this.name = name;
    this.price = +price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  static get collection() {
    const collection = 'products';
    return collection;
  }

  save() {
    const db = getDb();
    let action;

    if (this._id) {
      //  Update the Product
      action = db.collection(this.collection).updateOne({
        _id: this._id
      }, {
        $set: this
      });
    } else {
      // Insert new Product
      action = db.collection(this.collection).insertOne(this);
    }


    return action
      .then(result => result)
      .catch(err => {
        console.log(err)
      });
  }

  static fetchAll() {

    console.log(this.collection);

    const db = getDb();

    return db.collection(this.collection).find().toArray()
      .then(products => products)
      .catch(err => console.log(err));
  }

  static findById(_id) {
    const db = getDb();

    _id = new mongodb.ObjectId(_id); // Construct a new MongoDB ObjectId

    return db.collection(this.collection).findOne({
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
    db.collection(this.collection).deleteOne({
        _id
      })
      .then(result => result)
      .catch(err => console.log(err))
  }
}


module.exports = Product;