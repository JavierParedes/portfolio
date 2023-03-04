'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    type: String,
    image: String,
    password: String
});

module.exports = mongoose.model('User_db', UserSchema);