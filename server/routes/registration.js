var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

//build the REST operations at the base for registration
//this will be accessible from http://127.0.0.1:3000/registration if the default route for / is left unchanged
router.route('/')
    //GET all registration
    .get(function(req, res, next) {
        //retrieve all registration from Monogo
        mongoose.model('registration').find({}, function(err, registration) {
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //HTML response will render the index.jade file in the views/registration folder. We are also setting "registration" to be an accessible variable in our jade view
                    html: function() {
                        res.render('registration/index', {
                            title: 'All my registration',
                            "registration": registration
                        });
                    },
                    //JSON response will show all registration in JSON format
                    json: function() {
                        res.json(registration);
                    }
                });
            }
        });
    })
    //POST a new registration
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var userName = req.body.userName;
        var email = req.body.email;
        var socialId = req.body.SocialId;
        var userPic = req.body.UserPic;
        var method = req.body.method;
        console.log(req.body)
        //call the create function for our database
        mongoose.model('registration').create({
            userName: userName,
            email: email,
            socialId: socialId,
            userPic: userPic,
            method: method
        }, function(err, registration) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                res.json(registration);
            }
        })
    });

/* GET New registration page. */


module.exports = router;
