const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  email:{
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 255
  },
  password:{
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024
  }
},{timestamps: true})

module.exports =  mongoose.model('User', userSchema);