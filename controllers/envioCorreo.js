const {request, response} = require('express');
const nodeMailer = require ('nodemailer');

const envioCorreo = (req = request, resp = response) => {
    let body =req.body;
    let config= nodeMailer.createTransport({
        host:'smtp.gmail.com',
        post: 587,
        secure: true,

        auth:{
            user:'jpv1988@gmail.com',
            pass:'ldkwbndopxxjrcfg'
        },
        tls:{
            rejectUnauthorized:false,
            ciphers:"SSLv3"
        }
    });

    const opciones= {
        from: 'Portfolio',
        subject: body.asunto,
        to: body.email,
        text: body.mensaje
    };

    config.sendMail(opciones, function(error,result){

        if (error) return resp.json({ok:false, msg:error});

        return resp.json({
            ok:true,
            msg:result
        });
    })
   
}

module.exports ={
    envioCorreo
}