const {createMessage, getMessages} = require('../Controllers/messages.controller')
const express = require('express');
const messagesRouter = express.Router();

messagesRouter.post('/', createMessage);
messagesRouter.get('/:id', getMessages);

module.exports = messagesRouter;