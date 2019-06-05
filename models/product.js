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
    constructor(name) {
        this.name = name;
    }


    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err => {
              console.log(err);
            });
          });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }


}