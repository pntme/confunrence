
var mongoose = require('mongoose');  
var InterestSchema = new mongoose.Schema({  
     userName: String,
     email: String,
     socialId: String,
     UserPic: String,
     method: String,
     company: String,
     location: Object,
     _event: Object

});
var interest = mongoose.model('interest', InterestSchema);
module.exports = interest;