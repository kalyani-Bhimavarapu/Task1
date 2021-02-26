const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', 
  {
    user: req.user
    
  })
);

router.get('/approved', ensureAuthenticated, (req, res) =>{ 
  
  const user = {
    username: req.user.name }

  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
  });
});

router.get('/unapproved', (req, res) =>{ 
  res.sendStatus(401);
  });




module.exports = router;