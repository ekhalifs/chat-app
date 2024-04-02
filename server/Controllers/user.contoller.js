const userModel = require('../Models/user.mongo');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateToken(_id){
  const jwtToken = process.env.SECRET_JWT_TOKEN;
  return jwt.sign({_id}, jwtToken, {expiresIn:"3d"});
}

async function register(req, res){
  try{
    const {name, email, password} = req.body;
    let user = await userModel.findOne({email});
    if(user){
     return res.status(400).json('User already exists')
    }
    if(!name || !email || !password){
     return res.status(400).json('one or more field is missing')
    }
    if(!validator.isEmail(email)){
     return res.status(400).json('provide a valid email address')
    }
    if(!validator.isStrongPassword(password)){
     return res.status(400).json('Provide a more complex password')
    }
    user = new userModel({name, email,password });
    const salt = await bcrypt.genSalt(15)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    const token = generateToken(user._id)
   
    return res.status(201).json({_id: user._id, name: user.name, email:user.email, token});
  }catch(e){
    res.status(500).json(e.message);
  }

}

async function login(req,res){
  const {email, password} = req.body;
  try{
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(403).json('You provided wrong password or email,u')
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
      return res.status(403).json('You provided wrong password or email,N')
    }
    const token = generateToken(user._id);
    res.status(200).json({id:user._id, name:user.name, email, token});
  }catch(e){
    return res.status(500).json('something went wrong')
  }

 }

async function getUser(req,res){
  try{
    const userId = req.params.id
    const user = await userModel.findById(userId);
    return res.status(200).json(user);
  }catch(e){
    res.status(500).json(e.message);
  }
}

async function getUsers(_,res){
  try{
    const users = await userModel.find();
    return res.status(200).json(users);
  }catch(error){
    res.status(500).json('Something went wrong');
  }
}

module.exports ={
  register,
  login,
  getUser,
  getUsers
}