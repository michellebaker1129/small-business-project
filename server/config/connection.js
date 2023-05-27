const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
// TODO get correct URL
mongoose.connect('mongodb://localhost:', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection 
module.exports = mongoose.connection;