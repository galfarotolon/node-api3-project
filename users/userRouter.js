const express = require('express');

const router = express.Router();
//com
const Usersdb = require('./userDb')

const Postsdb = require('../posts/postDb')

router.post('/', validateUser('name'), (req, res) => {

  Usersdb.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error adding user"
      })
    })
});

router.post('/:id/posts', validateUserId, validatePost('text'), (req, res) => {
  // do your magic!

  const comment = { ...req.body, user_id: req.params.id }

  Postsdb.insert(comment)
    .then(post => {
      res.status(201).json(post)

    })

    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error adding user"
      })
    })
});



router.get('/', (req, res) => {

  Usersdb.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users.',
      });
    });
});


router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {

  Usersdb.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post)

    })
    .catch(err => {
      console.log(err)
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  Usersdb.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({ message: 'User Deleted' })
      } else {
        res.status(404).json({ message: 'Did not find user' })
      }
    })
});

router.put('/:id', validateUserId, (req, res) => {
  Usersdb.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(201).json(user)

      } else {
        res.status(400).json({ message: 'missing  required text field' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: 'Missing post data' })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // check that the hub with the given id exists
  Usersdb.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "Invalid User ID." });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the User",
      });
    });
}

function validateUser(prop) {
  return function (req, res, next) {
    // do your magic!
    if (!req.body) {
      res.status(400).json({ message: "missing user data" })
    }
    else if (!req.body[prop]) {
      res.status(400).json({ message: "missing required name field" })
    } else {
      next()
    }
  }
}


function validatePost(prop) {
  // do your magic!

  return function (req, res, next) {
    // do your magic!
    if (!req.body) {
      res.status(400).json({ message: "missing post data" })
    }
    else if (!req.body[prop]) {
      res.status(400).json({ message: "missing required text field" })
    } else {
      next()
    }
  }
}



module.exports = router;
