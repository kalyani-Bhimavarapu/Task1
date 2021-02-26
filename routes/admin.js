const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/posts', verifyToken, (req, res) => {
    
    jwt.verify(req.token, 'secretkey', async(err) => {
        if(err) {
          res.sendStatus(401);
        } else {
            try{
                const user = await User.find() ;
                 res.json(user);
                }catch(err){
                    res.json({message: err})
                }
            }
        });
    });

     router.post('/login', (req, res, next) => {
      passport.authenticate('local', {
        successRedirect: '/approved',
        failureRedirect: '/unapproved',
        failureFlash: true,
      })(req, res, next);
    });
    

function verifyToken(req, res, next) {
    
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined') {
     
      const bearer = bearerHeader.split(' ');
      
      const bearerToken = bearer[1];
      
      req.token = bearerToken;
      
      next();
    } else {
      
      res.sendStatus(401);
    }
  
  } 
  module.exports = router;