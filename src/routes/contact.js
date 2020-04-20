const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


router.post( '/sendemail' , (req, res) => {
    const { name, email, telefono, asunto, texto } = req.body;
/*
    contentHTML = `<h1>Info:</h1>
    <ul>
    <li>Usuario:${name}</li>
    <li>Email:${email}</li>
    <li>Telefono:${telefono}</li>
    <li>Asunto:${asunto}</li>
  
    </ul>
    <p>Texto:${texto}</p>
    `;


    const transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: 465,
        auth:{ user:'hola@detallesjugueteria.com', pass:'juanwgez76'},
        tls: {
            rejectUnauthorized: false
        }

    });
    
    const info = await transporter.sendMail({
        from:"'pablo' server <hola@detallesjugueteria.com>",
        to:'pciruelos@yahoo.com',
        subject: 'Subjeto',
        Text:'hola'
    });*/

});
module.exports=router;