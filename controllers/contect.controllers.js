require ('dotenv').config()
const nodemailer = require('nodemailer')
const contectUs =(req,res)=>{
    const {Username,Email,Phone,Message} = req.body


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    });

    let mailOptions = {
        from: process.env.AUTH_EMAIL, 
        to: Email, 
        subject: 'contect us',
        text: 'Welcom', 
        html: `<p>name is ${Username}:</p>
        <p>Phone is ${Phone} </p>
        <p> ${Message} </p> `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.send('Email has been sent');
    });


 

    
    


}


module.exports = {
    contectUs

}