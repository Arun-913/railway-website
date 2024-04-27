const user = require('../models/user');

const handleLogin = async(req, res) =>{
    const email = req.params.email;
    const data = await user.find({email : email});
    return res.json(data);
}

const handelSignUp = async(req, res) =>{
    const data = req.body;
    await user.create({
        username : data.username,
        email : data.email,
        password : data.password,
    });
    const getData = await user.find({email : data.email});
    return res.json(getData);
}

module.exports = {handleLogin, handelSignUp};