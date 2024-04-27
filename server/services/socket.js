require('dotenv').config();
const { Server } = require('socket.io');
const Redis = require('ioredis');
 
const pub = new Redis({
    host: process.env.HOST,
    port: process.env.REDIS_PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
});

const sub = new Redis({
    host: process.env.HOST,
    port: process.env.REDIS_PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
});

class SocketService {
    constructor() {
        console.log("init socket service...");
        this.clients = 0;
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*',
            }
        });
        sub.subscribe('MESSAGES');
        this.connectedSockets = new Set();

        // Bind the initListeners method to the instance of SocketService
        this.initListeners = this.initListeners.bind(this);
    }

    initListeners() {
        console.log("initListeners called");

        const io = this.io;
        io.on('connect', (socket) => {
            this.clients++;
            console.log(this.clients, " client is connected");
            console.log("new socket connected : ", socket.id);
            this.connectedSockets.add(socket.id);

            socket.on('disconnect', () => {
                this.clients--;
                console.log("socket disconnected : ", socket.id);
                console.log(this.clients, " client is connected");
                this.connectedSockets.delete(socket.id);
            });

            socket.on('send_message', async (data) => {
                await pub.publish('MESSAGES', JSON.stringify({ message: data.message, userName: data.userName, email: data.email, senderSocketId: socket.id }));
            });
        });

        sub.on('message', async (channel, data) => {
            if (channel === 'MESSAGES') {
                const { message: receivedMessage, senderSocketId } = JSON.parse(data);
                this.connectedSockets.forEach(receiverSocketId => {
                    if (receiverSocketId !== senderSocketId) {
                        io.to(receiverSocketId).emit('message', data);
                    }
                });
            }
        });
    }

    get io() {
        return this._io;
    }

    getClientCount(){
        return this.clients;
    }
}


module.exports = SocketService;