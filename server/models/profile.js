const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    email: String,
    tickets: [
        {
            trainDetails: Object,
            fileName: String,
            paymentId: String,
            contentType: String,
            data: Buffer
        }
    ]
},  { timestamps: true });

const profile = mongoose.model("profiles", profileSchema);

module.exports = profile;
