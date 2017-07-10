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

router.route('/interest').post(function(req, res) {
    console.log(req.body)
    // Registration.findById({ _id: req.body._id }, function(err, user) {
    //     if (err) {
    //         res.json(err)
    //     } else {
    //         user.location = req.body.location;
    //         user.company = req.body.company;
    //         user._event = req.body.event
    //         user.save(function(err) {
    //             if (err) {
    //                 res.json(err);
    //             } else {
    //                 res.json(user);
    //             }
    //         });
    //     }
    // });
});



module.exports = router;
