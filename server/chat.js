require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const SocketService = require('./services/socket.js');

async function init() {
    const socketService = new SocketService();

    const httpServer = http.createServer();
    const PORT = process.env.CHAT_PORT ? process.env.CHAT_PORT : 8002;

    socketService.io.attach(httpServer);

    httpServer.listen(PORT, () => console.log("Server started at port ", PORT));

    socketService.initListeners();
}

init();