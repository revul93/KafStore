const mongoose = require('mongoose');
const config = require('config');

// database connection initiator
const connect = async () => {
  try {
    await mongoose.connect(config.get('DatabaseURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected...');
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connect;
