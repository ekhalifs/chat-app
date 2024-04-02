const {createChat, getUserChats, getChat} = require('../Controllers/chat.controller');
const express = require('express');
const chatRouter = express.Router();

chatRouter.post('/',createChat)
chatRouter.get('/:id', getUserChats);
chatRouter.get('/:firstId/:secondId', getChat)

module.exports = chatRouter;