
var mongoose = require('mongoose');  
var registrationSchema = new mongoose.Schema({  
     userName: String,
     email: String,
     socialId: String,
     userPic: String,
     method: String
});
mongoose.model('registration', registrationSchema);