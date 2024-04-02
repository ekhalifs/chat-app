require('dotenv').config();
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const server = http.createServer(app);

async function mongoDBConnect(){
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connected successfully')
  }catch(e){
    console.log(e.message);
  }
}

async function startServer(){
  await mongoDBConnect();
  server.listen(5000,() =>{
    console.log('app is running fine...')
  })
}

startServer();