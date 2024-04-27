const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    msg:{
        type: String,
    },
},  { timestamps: true });

const message = mongoose.model("msg", msgSchema);

module.exports = message;
