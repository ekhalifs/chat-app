const chatModel = require('../Models/chat.mongo');

async function createChat(req,res){
  const {firstId, secondId} = req.body;
  try{
    const chat = await chatModel.findOne({
      members:{$all: [firstId, secondId]}
    })
    if(chat) return res.status(200).json(chat)
    const newChat = new chatModel({
      members:[firstId, secondId]
  })
    const response = await newChat.save();
    return res.status(201).json(response)
  }catch(error){
    return res.status(500).json(error)
  }
}

async function getUserChats(req,res){
  const userId = req.params.id;
  try{
    const chats = await chatModel.find({
      members:{$in:[userId] }
    })
    res.status(200).json(chats)
  }catch(error){
    res.status(500).json(error)
  }
}

async function getChat(req,res){
  const {firstId, secondId} = req.params;
  try{
    const chat = await chatModel.find({
      members:{$all: [firstId, secondId]}
    })
     res.status(200).json(chat);
  }catch(e){
    res.status(500).json(e)
  }
}

module.exports  = {
  createChat,
  getUserChats,
  getChat,
}