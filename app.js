const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const pageRoutes = require('./routes/pages');
const adminRoutes = require('./routes/admin');
const errorRoutes = require('./controllers/errorController');

app.use(pageRoutes);
app.use(adminRoutes);
app.use(errorRoutes.get404);


app.listen(80);