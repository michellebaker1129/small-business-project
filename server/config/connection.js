const mongoose = require("mongoose");
import 'dotenv/config';
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/C2C");

module.exports = mongoose.connection;