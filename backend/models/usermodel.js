const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uniqueUserId: { type: String, required: true, unique: true } // Unique identifier for chat sessions
});

module.exports = mongoose.model('User', userSchema);
