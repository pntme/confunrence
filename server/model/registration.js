var mongoose = require('mongoose');  
var registrationSchema = new mongoose.Schema({  
  name: String
});
mongoose.model('registration', registrationSchema);