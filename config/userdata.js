var exports = module.exports = {};

let User = require('../models/User');

exports.newUser = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        console.log(req.body);
        let newUser = new User({
           name,
            email,
            password
          });

        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Save User failed.'});
            }
            res.json({success: true, msg: 'Successful created new User.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

exports.UsersList = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        User.find(function (err, users) {
            if (err) return next(err);
            res.json(users);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

getToken = function (headers) {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};