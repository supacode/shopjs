const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const csurf = require('csurf');
const flash = require('connect-flash');
const User = require("./models/user");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const MONGO_URI = "mongodb://localhost/shop";

const helpers = require('./util/helpers');


app.use(express.static(path.join(__dirname, "public")));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

const store = new MongoStore({
    uri: MONGO_URI,
    collection: "sessions"
});

const csrf = csurf();


app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store
    })
);

app.use(csrf);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            throw new Error(err);
        });
});

app.use((req, res, next) => {
    res.locals.isAuth = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});


app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.get('/500', errorController.get500);
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

app.use(helpers.errorPage);



mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: 1
    })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));