const express = require('express');

const server = express();

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const logger = require('morgan')

server.get('/', (req, res) => {
  res.status(200).json({ environment: process.env.NODE_ENV, port: process.env.PORT, greeting: process.env.GREETING })
});



server.use(logger(':method :url :date'));
server.use(express.json());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

module.exports = server;
