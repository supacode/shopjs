const app = require('./app');
const connectDb = require('./util/connectDb');

connectDb();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
