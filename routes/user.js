'use strict'

var express = require('express');
var UserController = require ('../controllers/user');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./uploads'});

var md_auth = require('../middlewares/authenthicated');

router.get('/home', UserController.home);
router.post('/test', UserController.test);
router.post('/save-user', UserController.saveUser);
router.get('/user/:id?', UserController.getUser);
router.get('/users?', UserController.getUsers);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);
router.post('/upload-image-user/:id', multipartMiddleware, UserController.uploadImage);
router.get('/get-image-user/:image', UserController.getImageFile);
router.post('/login', UserController.loginUser);


module.exports = router;