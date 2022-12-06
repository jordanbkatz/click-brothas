import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import Game from './Game';

const port = process.env.PORT || 3002;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
const game = new Game();

io.on('connection', (socket: Socket) => {
    socket.on('join', () => {
        game.addBrotha(socket.id);
        socket.emit('joined', socket.id);
    });
    socket.on('name', (data: string) => {
        game.changeName(socket.id, data);
    });
    socket.on('click', () => {
        game.click(socket.id);
    });
    socket.on('disconnect', () => {
        game.removeBrotha(socket.id);
    });
    setInterval(() => {
        game.update();
        io.emit('game', game);
    }, 100);
});

server.listen(port, () => {
    console.log(`server running on port: ${port}`);
});