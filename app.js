'use strict'

var express = require('express');
var bodyParser= require('body-parser');

var app = express();

//cargar archivos rutas
var project_routes = require ('./routes/project');
var user_routes = require ('./routes/user');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var path=require('path');

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(require('./routes/correoRoutes'));

app.listen('3000',()=>{
    console.log('escuchando');
})

//rutas
app.use('/',express.static('client', {redirect: false}));
app.use('/api',project_routes);
app.use('/api',user_routes);

app.get('*', function (req, res, next){
    res.sendFile(patch.resolve('client/index.html'));
});

module.exports = app;

