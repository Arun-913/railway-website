const profile = require('../models/profile.js');
const {sendPdf} = require('../services/email-sender.js');
const {generatePDF} = require('../services/generatePdf.js');
const fs = require("fs");

const handleGetProfile = async(req, res) =>{
    const email = req.query.email;
    // console.log(email);
    const result = await profile.find({email});
    return res.json(result[0]?.tickets);
}

const handleUpdateProfileWithTicket = async(req, res) =>{
    const { train, passenger, email, orderId, paymentId } = req.body;

    try {
        const fileName = await generatePDF(req.body);
        const filePath = `./${fileName}.pdf`;
        
        setTimeout(async() => {
            const pdfData = fs.readFileSync(filePath);
            console.log(pdfData);
    
            if (!pdfData) {
                console.error('Error reading PDF file:', filePath);
                return res.status(500).json({ error: 'Failed to read PDF file' });
            }
    
            const ticket = {
                trainDetails: train,
                fileName: fileName,
                paymentId: paymentId,
                contentType: 'application/pdf',
                data: pdfData
            };
    
            const updatedProfile = await profile.findOneAndUpdate(
                { email },
                { $addToSet: { tickets: ticket } },
                { upsert: true, new: true }
            );
    
            // console.log('Updated profile:', updatedProfile);
            
            await sendPdf(req.body?.email, fileName);
            return res.json({ msg: 'success' });
        }, 2000);
    } catch (error) {
        console.error('Error generating PDF:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {handleGetProfile, handleUpdateProfileWithTicket};