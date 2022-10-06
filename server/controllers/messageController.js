const messageModel = require('../model/messageModel')

module.exports.addMessage = async (req, res, next) => {
   try {
      const {from , to, message} = await req.body;
      const data = await messageModel.create({
        message: {text : message},
        users: [from, to],
        sender:from,
      });
      if(data){
        return await res.json({msg:"Message added successfully"});
      }
        return await res.json({msg:"Failed to add message to database"})
   }
   catch (err){
      await next(err);
   }
};

module.exports.getAllMessage = async (req, res, next) => {
    try {
       const {from , to } = await req.body;
       const message = await  messageModel.find({
        users:{
           $all:[from , to],
        },}).sort({ updatedAt: 1});

       const projectMessage = await message.map((msg) =>{
        return  {
            fromSelf:msg.sender.toString() === from,
            message: msg.message.text
        }});
        
       await res.json(projectMessage);
    }
    catch (err){
      await next(err);
    } 
};