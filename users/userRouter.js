const express = require('express');

const router = express.Router();

const Usersdb = require('./userDb')

router.post('/', validateUserId, (req, res) => {

  if (!req.body) {
    res.status(401).json({ message: "invalid" })
  } else {

    Usersdb.insert(req.body)
      .then(user => {
        res.status(201).json(user)
      }).catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error adding the user',
        });
      });
  }
})



router.post('/:id/posts', (req, res) => {
  // do your magic!
  res.status(201).json(req.user);
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
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
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

function validateUser(req, res, next) {
  // do your magic!

}


module.exports = router;
