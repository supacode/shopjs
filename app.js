const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const pageRoutes = require('./routes/admin');
const productRoutes = require('./routes/shop');
const errorRoutes = require('./controllers/error');

app.use(pageRoutes);
app.use(productRoutes);
app.use(errorRoutes.get404);


app.listen(80);