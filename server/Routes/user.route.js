const express = require('express');
const { register, login, getUser, getUsers } = require('../Controllers/user.contoller');
const userRouter  = express.Router();

userRouter.get('/',getUsers);
userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/:id',getUser);

module.exports = userRouter;