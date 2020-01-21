const mongoose = require('mongoose');

const connectDB = async () => {
  const connection = await mongoose.connect(`mongodb://localhost:27017/shop`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  return connection;
};

module.exports = connectDB;
