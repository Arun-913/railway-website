require('dotenv').config();
const nodemailer = require('nodemailer');

const sendPdf = (email, fileName) =>{
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        service: 'gmail',
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: true
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Message from nodemailer',
        text: 'Dear Customer, your ticket has been successfully booked and sent to your mail.',
        attachments: [
            {
                filename: `${fileName}.pdf`,
                path: `${fileName}.pdf` 
            }
        ]
    };
    
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log('Error occureed', error);
        }
        else{
            console.log('Email sent : ', info.response);
        }
    });
};

const sendOtp = (email, otp, username) =>{
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        service: 'gmail',
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: true
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `${otp} OTP for verification`,
        text: `Dear ${username},\n\nPlease enter the OTP to proceed signing on TrackEase WebApp. \n\n${otp}`
    };
    
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log('Error occureed', error);
        }
        else{
            console.log('Email sent : ', info.response);
        }
    });
};

module.exports = {sendPdf, sendOtp};