const mongoose = require('mongoose');

module.exports = (connectionString = process.env.DB_CONNECTION_STRING) => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
