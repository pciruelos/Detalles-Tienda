const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


router.post( '/sendemail' , (req, res) => {
    const { name, email, telefono, asunto, texto } = req.body;

    contentHTML = `<h1>Consulta:</h1>
    <ul>
    <li>Usuario:${name}</li> 
    <li>Email:${email}</li>
    <li>Telefono:${telefono}</li>
    <li>Asunto:${asunto}</li>
  
    </ul>
    <p>Texto:${texto}</p>
    `;


    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{user:'holaciru@gmail.com', pass:'nuevaparaholaciru'},
        tls: {
            rejectUnauthorized: false
        }
    });

   /*   
    
    const info = await transporter.sendMail({
        from:"'pablo' server <hola@detallesjugueteria.com>",
        to:'pciruelos@yahoo.com',
        subject: 'Subjeto',
        Text:'hola'
    });*/

    let mailOptions = {
        from: 'holaciru@gmail.com',
        to: 'detalles.variedades@gmail.com',
        subject:'Consulta desde la Web',
        html: contentHTML,
    };

    transporter.sendMail(mailOptions, function(err, data){
        if (err){
            console.log('error bicht');
        }else{
            res.redirect('/products/gracias');
        }
        
    });
});


module.exports = router;