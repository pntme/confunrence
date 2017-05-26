
var mongoose = require('mongoose');  
var registrationSchema = new mongoose.Schema({  
     userName: String,
     email: String,
     socialId: String,
     UserPic: String,
     method: String,
     company: String,
     location: Object,
     _event: Object

});
var registration = mongoose.model('registration', registrationSchema);
module.exports = registration;