const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./util/db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));


app.set('view engine', 'ejs');
app.set('views', 'views');

const User = require('./models/user');
const Product = require('./models/product');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./controllers/error');



app.use ((req,res,next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch (err => console.log(err));
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes.get404);

User.hasMany(Product, {constraints: true, onDelete: 'CASCADE'});

sequelize
    // .sync({force: true})
    .sync()
    .then( result => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
           user =  User.create({name:"Maverick",email: "test@domain.com"})
        }
        return user;
    })
    .then (user => {
        app.listen(3000);
    })
    .catch(err => console.log(err));