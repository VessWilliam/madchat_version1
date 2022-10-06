const Users = require('../model/userModel');
const brcypt = require('bcrypt');

module.exports.register= async (req,res,next)  => {

try { 
    const { username , email ,password} = await req.body;
    
    const usernameCheck = await Users.findOne({ username });
    if(usernameCheck) return await res.json({msg:'username already in use' , status: false});
    
    const emailCheck = await Users.findOne({ email });
    if(emailCheck) return await res.json({msg:'email already in use' , status: false});
    
    const hashPassword  = await brcypt.hash(password, 10); 
    
    const user  = await Users.create({
        username,
        email,
        password: hashPassword,
    
    });    
    await delete user.password;
    return await res.json({ status: true, user});
}
catch (err)  {
    await next(err);   
}};

module.exports.login = async (req,res,next)  => {

try { 
    const { username ,password} = await req.body;
    
    const user = await Users.findOne({ username });
    if(!user) 
    return await res.json({msg:'incorrect username or password' , status: false});
    
    const isPasswordValid = await brcypt.compare(password,user.password);
    if(!isPasswordValid) 
    return await res.json({msg:'incorrect username or password' , status: false});
    
    await delete user.password;
    return await res.json({status: true , user});
}
catch (err)  {
    await next(err);   
}}; 

module.exports.setAvatar = async (req,res,next)  => {
    try{   
        const userId = await req.params.id;
        const avatarImage = await req.body.image;
        const userData = await Users.findByIdAndUpdate(userId,
        {
            isAvatarImageSet: true,
            avatarImage,
        },

        );

        return await res.json({
            isSet: await userData.isAvatarImageSet,
            image: await userData.avatarImage,
        }); }
    catch(err){
        await next(err);
    }
}; 

module.exports.getAllUsers = async (req,res,next)  => {
    try{
      const user = await Users.find({ _id:{ $ne:req.params.id }}).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return await res.json(user);
    }
    catch(err){ 
       await next(err);
    }
}; 