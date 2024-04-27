const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    image : String,
    content: String,
    comments: [{
        email: String,
        name: String,
        comment: String,
    }],
},  { timestamps: true });

const news = mongoose.model("news", newsSchema);

module.exports = news;