const mongoose = require('mongoose');

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  return connection;
};

module.exports = connectDB;
