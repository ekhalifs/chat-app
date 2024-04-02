const messagesModel = require('../Models/messages.mongo')

async function createMessage(req,res){
  const {chatId, senderId, text} = req.body;
  try{
    const newMessage = new messagesModel({
      chatId, senderId, text
    });
    const response = await newMessage.save();
    return res.status(201).json(response)
  }catch(e){
    res.status(500).json(e)
  }
}

async function getMessages(req, res){
  const chatId = req.params.id;
  try{
    const messages = await messagesModel.find({chatId});
    res.status(200).json(messages);
  }catch(e){
    res.status(500).json(error)
  }
}

module.exports = {
  createMessage,
  getMessages
}