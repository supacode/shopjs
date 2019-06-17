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

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./controllers/error');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes.get404);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));