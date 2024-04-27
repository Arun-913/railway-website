const PDFDocument = require('pdfkit');
const fs = require("fs");
const random = require("simple-random-number-generator");

const mapOfClasses = {
    'SL': 'Sleeper',
    '2S': 'Second Sitting',
    '3A': 'Third AC',
    '2A': "Second AC",
    '1A': 'First AC'
};

const mapOfQuota = {
    'GN': "General",
    'TQ': 'Tatkal',
    'PT': "Premium Tatkal",
    'SS': 'LOWER BERTH/SR.CITIZEN',
    'LD': 'Ladies',
    'HP': 'PERSON WITH DISABILITY'
};

const generatePDF = async(data) =>{
    const doc = new PDFDocument();

    const pnr = random({min:1000000000, max:9999999999, integer: true});
    const stream = fs.createWriteStream(`${pnr}.pdf`);
    doc.pipe(stream);

    doc.lineWidth(2); 
    doc.strokeColor('black'); 

    doc.rect(25, 20, 565, 750); 

    doc.fontSize(18).text('Electronic Reservation Slip (ERS)- Normal User', 25, 35, { align: 'center', underline: true});

    doc.moveDown();

    const viewportWidth = doc.page.width;
    const viewportHeight = doc.page.height;

    doc.image("img1.png", 25, 70, {width: viewportWidth-50, height: 70});
    doc.moveDown(2);
    // console.log(`${doc.x}  ${doc.y}`)

    doc.fontSize(12).text('Booked From', 50, 160);
    doc.image("img2.jpg", 200, 145, {align: 'center'});
    doc.fontSize(12).text('To', 450, 160, {align: 'center'});

    // from station
    doc.fillColor('blue');
    doc.fontSize(14).text(`${data.train.from}`, 50, 193);
    doc.fontSize(14).text(`${data.train.from}`, 85, 193, {align: 'center'});
    doc.fontSize(14).text(`${data.train.to}`, 450, 193, {align: 'center'});
    doc.fillColor('black');

    doc.moveTo(25, 210).lineTo(590, 210).stroke();

    doc.fontSize(14).text('PNR', 50, 220);
    doc.fontSize(14).text('Train No./Name', 85, 220, {align: 'center'});
    doc.fontSize(14).text('Class', 435, 220, {align: 'center'});

    doc.fillColor('blue');
    doc.fontSize(12).text(pnr, 40, 240);
    doc.fontSize(12).text(`${data.train.trainNo} / ${data.train.trainName}`, 85, 240, {align: 'center'});
    doc.fontSize(12).text(`${mapOfClasses[data.train.classes]} (${data.train.classes})`, 435, 240, {align: 'center'});

    doc.fillColor('black');

    doc.fontSize(14).text('Quota', 50, 260, {align: 'left'});
    doc.fontSize(14).text('Distance', 85, 260, {align: 'center'});
    doc.fontSize(14).text('Booking Date', 450, 260, {align: 'center'});

    doc.fillColor('blue');
    doc.fontSize(12).text(`${mapOfQuota[data.train.quota]} (${data.train.quota})`, 30, 275, {align: 'left'});
    doc.fontSize(12).text(data.train.distance, 85, 275, {align: 'center'});
    doc.fontSize(12).text(`${data.train.date}`, 450, 275, {align: 'center'});
    doc.fillColor('black');

    doc.moveTo(25, 290).lineTo(590, 290).stroke();

    doc.fontSize(16).text('Passenger Details', 30, 300, {align: 'left', underline: true});

    doc.fontSize(14).text('#', 30, 320, {align: 'left'});
    doc.fontSize(14).text('Name', 45, 320, {align: 'left'});
    doc.fontSize(14).text('Age', 160, 320, {align: 'left'});
    doc.fontSize(14).text('Gender', 215, 320, {align: 'left'});
    doc.fontSize(14).text('Booking Status', 290, 320, {align: 'left'});
    doc.fontSize(14).text('Current Status', 430, 320, {align: 'left'});

    data.passenger.forEach((element,index) => {
        // console.log(index);
        doc.fontSize(12).text(`${index+1}`, 30, 340+(index*20), {align: 'left'});
        doc.fontSize(12).text(`${element.name.toUpperCase()}`, 45, 340+(index*20), {align: 'left'});
        doc.fontSize(12).text(`${element.age}`, 160, 340+(index*20), {align: 'left'});
        doc.fontSize(12).text(`${element.gender.toUpperCase()}`, 215, 340+(index*20), {align: 'left'});
        doc.fontSize(12).text(`${data.train.currentStatus}`, 290, 340+(index*20), {align: 'left'});
        doc.fontSize(12).text(`${data.train.currentStatus}`, 430, 340+(index*20), {align: 'left'});
    });

    const len = data.passenger.length;
    doc.moveTo(25, 355+(len*20)).lineTo(590, 355+(len*20)).stroke();

    doc.fontSize(12).text(`Transaction Id: ${random({min:100000000000000, max:999999999999999, integer:true})}`, 30, 365+(len*20), {align: 'left'});
    doc.fontSize(14).text('Payment Details', 30, 385+(len*20), {align: 'left',underline: true});

    doc.fontSize(12).text('Ticket Fare', 30, 405+(len*20), {align: 'left'});
    doc.fontSize(12).text('IGST - 2.5%', 30, 425+(len*20), {align: 'left'});
    doc.fontSize(12).text('SGST - 2.5%', 30, 445+(len*20), {align: 'left'});
    doc.fontSize(14).text('Total Amount', 30, 465+(len*20), {align: 'left', underline: true});

    const price = data.train.price * len;
    doc.fontSize(12).text(price - (price*2.5/100)*2, 200, 405+(len*20), {align: 'left'});
    doc.fontSize(12).text(price*2.5/100, 200, 425+(len*20), {align: 'left'});
    doc.fontSize(12).text(price*2.5/100, 200, 445+(len*20), {align: 'left'});
    doc.fontSize(14).text(price, 200, 465+(len*20), {align: 'left'});

    doc.end();

    stream.on('finish', () => {
        console.log('PDF file created successfully');
    });
    return pnr;
};

module.exports = {generatePDF};