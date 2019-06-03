const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const pageRoutes = require('./routes/pageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorRoutes = require('./controllers/errorController');

app.use(pageRoutes);
app.use(adminRoutes);
app.use(errorRoutes.get404);


app.listen(80);