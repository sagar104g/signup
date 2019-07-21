const mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    userName: String,
    password: String
});
var User = mongoose.model('User', userSchema);

module.exports = User