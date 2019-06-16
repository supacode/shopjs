const db = require('../util/db');


module.exports = class Product {
    constructor(id,name,price,description,imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }


    save() {

    }

    static fetchAll() {
      return db.execute("SELECT * FROM `products`");
    }

    static findById(id) {

    }


    static deleteById(id) {

    }

}