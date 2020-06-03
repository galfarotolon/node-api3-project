const express = require('express');

const router = express.Router();

const Postsdb = require('./postDb')

router.get('/', (req, res) => {

  Postsdb.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
