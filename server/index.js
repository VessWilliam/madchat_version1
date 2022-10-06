const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoutes");
const app = express();
const socket = require("socket.io");
require("dotenv").config({path: './config/.env'});
async function run() {
await app.use(cors());
await app.use(express.json());

await app.use("/api/auth", userRoute)
await app.use("/api/messages", messageRoute)


 await mongoose.connect( process.env.MONGO_URI,{
       useNewUrlParser: true,
       useUnifiedTopology: true,
}).then(() => {
  console.log("Connected DB suscessful");
}).catch((err) => {console.log(err.message);});



await app.get('/', async(req, res) => {
  await res.send('hello')
})


 const server = await app.listen(process.env.PORT || 5000,() =>
{ console.log(`Server listen on port ${process.env.PORT}`); });


const io = await socket(server,{
  cors:{
    origin:"*",
    credentials: true,
  },
});


global.onlineUsers = await new Map();

await io.on('connection', async (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', async (userId) => {
    await onlineUsers.set(userId, socket.id);
  });
  
socket.on('send-msg', async (data)=>{
     const sendUsersSocket= await onlineUsers.get(data.to);
     if(sendUsersSocket){
      await socket.to(sendUsersSocket).emit('msg-received', data.message);
    }
  })
});

};

run();