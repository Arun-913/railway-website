const mongoose = require('mongoose');

async function connectMongoDB(url){
    console.log("MongoDB Connected");
    return mongoose.connect(url);
}

module.exports = {connectMongoDB};