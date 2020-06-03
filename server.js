const express = require('express');

const server = express();

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const logger = require('morgan')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



server.use(logger(':method :url :date'));
server.use(express.json());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

module.exports = server;
