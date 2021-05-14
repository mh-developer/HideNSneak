const mongoose = require('mongoose');

module.exports = () => {
  const mongoDB = process.env.DB_CONNECTION_STRING;

  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
