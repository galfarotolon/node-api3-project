const express = require('express');

const server = express();

const postRouter = require('./posts/postRouter');

const logger = require('morgan')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {


// }





server.use(logger(':method :url :date'));
server.use(express.json());
server.use('/api/posts', postRouter);

module.exports = server;
