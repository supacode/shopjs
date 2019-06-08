const fs = require('fs');
const path = require('path');


const filePath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  );
const getProductsFromFile = cb => {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return cb([]);
      } 

     return cb(JSON.parse(fileContent));

    });
};

module.exports = class Product {
    constructor(id,name,price,description,imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }


    save() {
        getProductsFromFile(products => {
          if (this.id) {
            const existingProductIndex = products.findIndex(
              prod => prod.id === this.id
            );
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
              console.log(err);
            });
          } else {
            this.id = (new Date).getTime().toString();
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err => {
              console.log(err);
            });
          }  
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id,cb) {
      getProductsFromFile( products => {
        const product = products.find( prod => prod.id === id);
        return cb(product);
      });

    }


}