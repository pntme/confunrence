
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/confunrence');
mongoose.Promise = global.Promise;