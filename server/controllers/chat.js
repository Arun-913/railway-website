const message = require('../models/chat.js');

const handleInsertMessage = async(req, res) =>{
    const data = await message.find({});
    // console.log(data);
    return res.json(data);
}

const handlefetchMessage = async(req, res)=>{
    const data = req.body;
    console.log(data);
    await message.create({
        username : data.username,
        email : data.email,
        msg : data.msg,
    });
    return res.json({msg : "successful"});
}

module.exports ={handleInsertMessage, handlefetchMessage};