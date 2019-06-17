const db = require('../util/db');


module.exports = class Product {
  constructor(id, name, price, description, imageUrl) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }


  save() {

    return db.execute("INSERT INTO `products` SET `name` = ?, `price` = ?, `description` = ?, `imageUrl` = ?", [this.name, this.price, this.description, this.imageUrl]);



  }

  static fetchAll() {
    return db.execute("SELECT * FROM `products`");
  }

  static findById(id) {
    return db.execute("SELECT * FROM `products` WHERE `id` = ?", [id]);
  }


  static deleteById(id) {

  }

}