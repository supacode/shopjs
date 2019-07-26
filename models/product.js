const getDb = require('../util/db').getDb;
const mongodb = require('mongodb');
class Product {
  constructor(name, price, description, imageUrl) {
    this.name = name;
    this.price = +price;
    this.description = description;
    this.imageUrl = imageUrl;
  }


  save() {
    const db = getDb();
    return db.collection('products').insertOne(this)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err));
  }

  static findById(_id) {
    const db = getDb();


    _id = new mongodb.ObjectId(_id); // Construct a new MongoDB ObjectId

    return db.collection('products').findOne({
        _id
      })
      .then(product => {
        return product;
      })
      .catch(err => {
        console.log(err);
      })
  }


}


module.exports = Product;