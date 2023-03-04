'use strict'

var User_db = require ('../models/user');
var fs= require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var jwt = require ('../services/jwt');

const { FILE } = require('dns');
const { exists } = require('../models/user');
const user = require('../models/user');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la Home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'soy el metodo o accion test del controlador de usuario'
        });
    },

    saveUser: function (req, res){
       

        var params = req.body;
        console.log(params)

        var userdata = new User_db();
        userdata.name = params.name;
        userdata.surname = params.surname;
        userdata.nick = params.nick;
        userdata.email = params.email;
        userdata.type = 'user';
        userdata.image = null;

       bcrypt.hash(params.password, null, null, (err, hash) => {
        userdata.password = hash;

        userdata.save((err, userStored) => {
            console.log(err);
                if(err) return res.status(500).send({ message: 'Error al guardar el usuario'});
    
                if (!userStored) return res.status(404).send({ message: 'No se ha podido guardar el usuario'});
    
                return res.status(200).send({userdata: userStored});
            });
        }); 
    },

    
    getUser: function(req, res){
        var userId = req.params.id;

        if (userId==null) return res.status(404).send({ message: 'El usuario no existe'});

        User_db.findById(userId,(err, user) => {
            if(err) return res.status(500).send({ message: 'Error al devolver los datos'});
    
            if (!user) return res.status(404).send({ message: 'El usuario no existe'});
    
            return res.status(200).send({
                user
            });
        });

    },

  
    getUsers: function (req, res){

        User_db.find({}).exec((err, users) => {
            if(err) return res.status(500).send({ message: 'Error al devolver los datos'});
    
            if (!users) return res.status(404).send({ message: 'El usuario no existe'});
    
            return res.status(200).send({
                users
            });
        });
    },

    

    updateUser: function (req, res){
        console.log("estoy escuchando el backend");
        var userId = req.params.id;
        var update = req.body;
        User_db.findByIdAndUpdate(userId, update, {new:true} ,(err, userUpdated) => {
            
            if(err) return res.status(500).send({ message: 'Error al actualizar'});
    
            if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario'});
            
            return res.status(200).send({
                userdata: userUpdated
            });
        });
    },

    

    deleteUser: function (req, res){
        var userId = req.params.id;
        
        User_db. findByIdAndRemove(userId, (err, userRemoved) => {
            if(err) return res.status(500).send({ message: 'No se ha podido borrar el proyecto'});
    
            if (!userRemoved) return res.status(404).send({ message: 'No se puede eliminar el proyecto'});
    
            return res.status(200).send({
                userdata: userRemoved
            });
        });
    },

 
    uploadImage: function (req, res){
        var userId = req.params.id;

        var fileName = 'Imagen no subida ...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split ('/');
            var fileName = fileSplit[1];
            var extSplit = fileName.split ('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                User_db.findByIdAndUpdate(userId, {image: fileName},{new:true},(err, userUpdated) => {
                    if(err) return res.status(500).send({ message: 'La imagen no se ha subido'});
            
                    if (!userUpdated) return res.status(404).send({ message: 'El proyecto no existe'});
            
                    return res.status(200).send({
                        userdata: userUpdated
                    });
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message: 'La extension no es valida'});
                })
            }

        }else{
            return res.status(200).send({
                message: fileName
            })
        }
    },


    

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        });
    },

    loginUser: function (req, res){
        var params = req.body;

        var email = params.email;
        var password = params.password;

        User_db.findOne({email: email}, (err, UserLogin) => {
            if(err) return res.status(500).send({message: 'Error en la petición'});
            if(UserLogin){
                console.log(UserLogin);
                bcrypt.compare(password, UserLogin.password, (err, check) => {
                    if (check){
                        
                        if(params.gettoken){
                            return res.status(200).send({
                                token: jwt.createToken(UserLogin)
                            });
                        }else{
                            UserLogin.password=undefined;
                            return res.status(200).send({UserLogin})
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no se ha podido identificar'});
                    }
                })

            }else{
                res.status(404).send({message: 'El usuario no se ha podido identificar!!'});
            }
        });

    },
    
};


module.exports = controller;