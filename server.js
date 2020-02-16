const app = require('./app');
const connectDb = require('./util/connectDb');

// Database connection
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`App listening on ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
