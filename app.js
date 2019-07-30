const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');



const User = require("./models/user");

app.use(express.static(path.join(__dirname, "public")));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./controllers/error");


app.use((req, res, next) => {

    User.findById('5d3b852f34fa945eb52345ef')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id)
            next();
            return user;
        })
        .catch(err => console.log(err));

});



// app.use("/admin", adminRoutes);
// app.use(shopRoutes);
// app.use(errorRoutes.get404);

mongoose.connect('mongodb://localhost/shop')
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));