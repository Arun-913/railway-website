require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const {connectMongoDB} = require('./mongoConnection');
const {createOrderId} = require('./services/payment.js');
const {handelSignUp, handleLogin} = require('./controllers/authentication.js');
const {handleGetNews, handlePostNews, handleGetNewsById, handlePostComment} = require('./controllers/news.js');
const {handleSendOTP} = require('./controllers/otp.js');
const {handleGetProfile, handleUpdateProfileWithTicket} = require('./controllers/profile.js');
const {handleInsertMessage, handlefetchMessage} = require('./controllers/chat.js');

const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

connectMongoDB(process.env.MONGO_URL);

app.get('/', (req, res)=>{
    return res.send("Server is running");
})

app.post('/post-user', handelSignUp);
app.get('/get-user:email', handleLogin);

app.post('/generate-otp', handleSendOTP);

app.post('/post-news', handlePostNews);
app.get('/get-news', handleGetNews);
app.get('/get-news/:id', handleGetNewsById);
app.post('/post-comment', handlePostComment);

app.post('/createOrder', createOrderId);

app.post('/post-ticket', handleUpdateProfileWithTicket);
app.get('/get/profile', handleGetProfile);

app.get('/get-message', handleInsertMessage);
app.post('/post-message', handlefetchMessage);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    // console.log('a user connected : ', socket.id);

    socket.on("send_message", (data) =>{
        socket.broadcast.emit(`receive_message`, data);
    });
});

io.listen(process.env.CHAT_PORT);

app.listen(process.env.PORT, () => console.log(`Server Started at ${process.env.PORT}`));