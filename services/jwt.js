'use strict'

var jwt = require('jwt-simple');
var moment = require ('moment');
var secret = 'TessayNala2022';

exports.createToken = function (userdata){
    var payload = {
        sub: userdata._id,
        name: userdata.name,
        surname: userdata.surname,
        email: userdata.email,
        type: userdata.type,
        nick: userdata.nick,
        image: userdata.image,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    };

    return jwt.encode(payload, secret);
};