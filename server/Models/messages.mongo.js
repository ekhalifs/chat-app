const mongoose = require('mongoose');
const messagesSchema = new mongoose.Schema({
  chatId: String,
  senderId: String,
  text: String,
},{
  timestamps: true
})

module.exports = mongoose.model('message',messagesSchema)