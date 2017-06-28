var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
Registration = require('../model/registration');



router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

router.route('/')
    .get(function(req, res, next) {
        mongoose.model('registration').find({}, function(err, registration) {
            if (err) {
                return console.error(err);
            } else {
                res.format({
                    html: function() {
                        res.render('registration/index', {
                            title: 'All my registration',
                            "registration": registration
                        });
                    },
                    json: function() {
                        res.json(registration);
                    }
                });
            }
        });
    })




.post(function(req, res) {
    if (req.body.email) {
        Registration.find({
            email: req.body.email
        }, function(err, users) {
            if (err) {
                res.json(err);

            } else {
                if (users.length === 0) {
                    // req.body.push({"loginCount": 0});
                    var User = new Registration(req.body);
                    User.save(function(err, user) {
                        if (err) {
                            res.json(err);

                        } else {
                            res.json(user)

                        }

                    });
                } else {
                    console.log(req.body.email)
                    // req.body.push({"loginCount": "1+"});
                    Registration.update({ email: req.body.email }, req.body, { multi: false }, function(err, user) {
                        if (err) {
                            res.json(err);

                        } else {
                            res.json(users);

                        }
                    });
                }
            }
        });
    } else {
        res.json({
            "code": 3,
            "status": "Email not found"
        })
    }
});


router.route('/SetProfile').post(function(req, res) {
    Registration.findById({ _id: req.body._id }, function(err, user) {
        if (err) {
            res.json(err)
        } else {
            user.location = req.body.location;
            user.company = req.body.company;
            user._event = req.body.event
            user.save(function(err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(user);
                }
            });
        }
    });
});


module.exports = router;
