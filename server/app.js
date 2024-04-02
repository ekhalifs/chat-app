const cors = require('cors');
const express = require('express');
const chatRouter = require('./Routes/chat.route');
const userRouter = require('./Routes/user.route');
const messagesRouter = require('./Routes/messages.route');
const app = express();

app.use(cors({
  origin:'*'
}))
app.use(express.json())
app.use('/chats',chatRouter);
app.use('/users',userRouter);
app.use('/messages', messagesRouter)
module.exports = app;