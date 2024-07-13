const User = require('../models/userSchema.model')
const UserVerification = require('../models/UserVerification')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const {v4 : uuidv4}= require('uuid')
const { Result } = require('express-validator')
const bcrypt = require('bcrypt')
const { error } = require('console')
require ('dotenv').config()
const generateJWT = require('../utils/generateJWT')
const verifyToken = require("../middlewares/verfiyToken");
const appError = require('../utils/appError')
const httpsStatusText = require('../utils/httpsStatusText');
const asyncwrapper = require('../middlewares/asyncwrapper')
// const userRoles = require("../utils/userRoles")
const forgetPassword = async (req, res) => {

    const { email } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

   
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    });

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Password Reset',
        html: `<p>Please click on the following link to reset your password:</p><p><a href="http://localhost:5000/restPassword/${token}">Reset Password</a></p>`
    };
    console.log(mailOptions)

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Password reset email sent successfully' });
    });
};


const restPassword =  async (req, res) => {
    const token = req.params.token;
    const { newPassword } = req.body;

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        const user = await User.findOneAndUpdate({ email: decoded.email }, { password: hashedPassword });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};








module.exports = {
    restPassword,
    forgetPassword
}