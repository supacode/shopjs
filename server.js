const app = require('./app');
const connectDb = require('./util/connectDb');

// Database connection
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
