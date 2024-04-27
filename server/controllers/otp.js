const {sendOtp} = require('../services/email-sender.js');

const handleSendOTP = (req, res) =>{
    const data = req.body;
    // console.log(data);
    sendOtp(data.email, data.otp, data.username);
    return res.json({msg : "success"});
}

module.exports = {handleSendOTP};