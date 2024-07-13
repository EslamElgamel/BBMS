
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




const transporter = nodemailer.createTransport({
    service:"gmail",
    // port : 5000,
    // secure:true,
    // logger:true,
    // debug:true,

    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    },
    // tls:{
    //     rejectUnauthorized:true
    // }
})

transporter.verify((error,success) => {
    if(error){
        console.log(error)
    }else{
        console.log("ready for messages")
        console.log(success)
    }
})


// const signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if any required field is missing
//         if (!name || !email || !password) {
//             return res.status(400).json({ error: "Please provide all required fields" });
//         }

//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({ error: "User with this email already exists" });
//         }

//         // Create a new user
//         const newUser = new User({ name, email, password,verified: false, });
//         const token = await generateJWT({email: newUser.email, id:newUser._id, role: newUser.role})
//         // console.log(token)
//         newUser.token = token 

//         // Save the new user to the database
//          newUser.save().then((result) => {
//             sendVerificationEmail(result,res.status(201).json({stauts: httpsStatusText.SUCCESS , data:{user:newUser }}))
//          });

//         // Respond with the user details after saving
//         // res.json({ success: "User registered successfully", _id: newUser._id, name, email });
//     } catch (err) {
//         console.log("Error in signup:", err);
//         res.status(500).json({ error: "Error during user registration" });
//     }
// };

const signup = (req, res) => {
    let {fullName , email , password,role} = req.body;

    if(fullName == ""||email == ""||password == ""){
        res.json({
            status:"FAILED",
            message:"Please provide all required fields"
        })
    }else if(!/^[a-zA-Z]*$/.test(fullName)){
        res.json({
            status:"FAILED",
            message:"Please provide a valid name"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status:"FAILED",
            message:"Please provide a valid email"
        })
    }else if(password.length < 8){
        res.json({
            status:"FAILED",
            message:"password is to short"
        })
    }else{
        User.find({email})
     .then(result => {
        if(result.length){
            res.json({
                status:"FAILED",
                message:"user already exists",
                error:result.message
                
            })
        }else{
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds).then(hashedpassword =>{
                const newUser = new User({
                    fullName,
                    email,
                    password: hashedpassword,
                    role,
                    verified: false
                })
    
                const token =  generateJWT({email: newUser.email, id:newUser._id, role: newUser.role})
                newUser.token = token
                
                newUser.save().then(result =>{
                    sendVerificationEmail(result,res)

                }).catch(err =>{
                    res.json({
                        status:"FAILED",
                        message:"an error occurred while registering user",
                        error:err.message
                    })

                });

            }).catch(err =>{
                res.json({
                    status:"FAILED",
                    message:"an error occurred while hashing password",
                })
            })

        }
    })
    .catch(err =>{
        res.json({
            status:"FAILED",
            message:"error occurred while searching for users"
        })
    })
}
}


// const signup = (req, res) => {
//     const userRoles = {
//         ADMIN: "ADMIN",
//         ADMIN2: "ADMIN2",
//         ADMIN3: "ADMIN3",
//         USER: "USER",
//         MANGER: 'MANGER',
//     }
//     let { fullName, email, password, role } = req.body;

//     if (fullName == "" || email == "" || password == "" || role == "") {
//         res.json({
//             status: "FAILED",
//             message: "Please provide all required fields, including a valid role."
//         });
//     } else if (!/^[a-zA-Z]*$/.test(fullName)) {
//         res.json({
//             status: "FAILED",
//             message: "Please provide a valid name."
//         });
//     } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//         res.json({
//             status: "FAILED",
//             message: "Please provide a valid email."
//         });
//     } else if (password.length < 8) {
//         res.json({
//             status: "FAILED",
//             message: "Password is too short."
//         });
//     } else if (!Object.values(userRoles).includes(role)) {
//         res.json({
//             status: "FAILED",
//             message: "Invalid role provided."
//         });
//     } else {
//         User.find({ email })
//             .then(result => {
//                 if (result.length) {
//                     res.json({
//                         status: "FAILED",
//                         message: "User already exists",
//                         error: result.message
//                     });
//                 } else {
//                     const saltRounds = 10;
//                     bcrypt.hash(password, saltRounds).then(hashedpassword => {
//                         const newUser = new User({
//                             fullName,
//                             email,
//                             password: hashedpassword,
//                             role,
//                             verified: false
//                         });

//                         const token = generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role });
//                         newUser.token = token;

//                         newUser.save().then(result => {
//                             sendVerificationEmail(result, res);
//                         }).catch(err => {
//                             res.json({
//                                 status: "FAILED",
//                                 message: "An error occurred while registering user.",
//                                 error: err.message
//                             });
//                         });

//                     }).catch(err => {
//                         res.json({
//                             status: "FAILED",
//                             message: "An error occurred while hashing password."
//                         });
//                     });
//                 }
//             })
//             .catch(err => {
//                 res.json({
//                     status: "FAILED",
//                     message: "Error occurred while searching for users."
//                 });
//             });
//     }
// };












const sendVerificationEmail = ({_id,email},res)=>{
    // const currendUri = "https://aliragab2002-be78ad0a8c78.herokuapp.com/";
    // const currendUri = "https://aliragab752002-32d59c101d22.herokuapp.com/";
    const currendUri = "http://localhost:5000/";
    // const currendUri = "https://aliragab752001-b5a2994d54c4.herokuapp.com/";

    const uniqueString = uuidv4() + _id;
    
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your email",
        html: `<h1>Hello ${email}</h1>
        <p>Please click on the link below to verify your email</p>
        <a href="${currendUri+"api/verify/"+_id +"/" + uniqueString}>hero</a>`
        

    };

    const saltRounds = 10;
    bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) =>{
        const newVerification = new UserVerification({
            userId:_id,
            uniqueString:hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,

        });

        newVerification
        .save()
        .then(()=>{
            transporter
            .sendMail(mailOptions)
            .then(()=>{
                res.json({status:"PENDING",
                message:"verification email sent ",
                
                })
            })
            .catch((error)=>{
                console.error(error)
                res.json({status:"FAILED",
                message:"verification email failed",

                })
            })
        })
        .catch((error) => {
            console.error(error)
            res.json({status:"FAILED",
            message:"coudnot save verification email data",
            })

        })
    })

}

const verifyEmail =(req,res)=>{
    const {userId,uniqueString} = req.params;
    UserVerification
    .find({userId})
    .then((result)=>{
        if(result.length > 0){
            const {expiresAt} = result[0];
            const hasheduniqueString = result[0].uniqueString;

            if(expiresAt < Date.now()){
                UserVerification
                .deleteOne({userId})
                .then((Result=>{
                    User
                    .deleteOne({_id:userId})
                    .then(()=>{
                        res.json({message:"link has been expired plese sign up again "})
                    })
                    .catch(error => {
                        res.json({message:"Error deleting user expired with uniqueString failed "})
                    })

                }))
                .catch((error)=>{
                    console.log(error)
                    res.json({message:"an error occured while deleting the user expired "})

                })
            }else{
                bcrypt
                .compare(uniqueString,hasheduniqueString)
                .then(result => {
                    if(result){
                        User.updateOne({_id:userId},{verified:true})
                        .then(()=>{
                            UserVerification.deleteOne({userId})
                            .then(()=>{
                                res.json({message:"verification successful"})
                            })
                            .catch(error => {
                                console.log(error);
                                res.json({status:"success",
                                message:"an error occured while finalizing successful verification "})
                            })
                        })
                        .catch(error => {
                            res.json({message:"an error occurred while updating user record"})
                        })
                    }else{
                        res.json({message:"invalid verification check your box"})
                    }

                })
                .catch(error => {
                    console.log(error)
                    res.json({message:"an error occured while comparing the unique string"})
                })
            }

        }else{
            res.json({message:"Account record does not exist or has beev verified aleardy please sign up"})
        }
    })
    .catch((error) => {
        console.log(error)
        res.json({message:"An error occurred while checking for exiting user verification"})
    })


}




// login 


// const signin = (req,res) => {
//     let {email,password} = req.body;
//     email = email.trim();
//     password = password.trim();

//     if(email == "" || password == ""){
//         res.json({
//             status:"FALIED",
//             message:"Please enter your email address"

//         })

//     }else{
//         User.find({email:email})
//         .then(data =>{
//             if(data.length){

//                 if(!data[0].verified){
//                     res.json({
//                         status:"FALIED",
//                         message:"Email has not been verified check your inbox"
//                     })
//                 }else{
//                     const hashedPassword = data[0].password
//                     bcrypt.compare(password,hashedPassword)
//                     .then(result =>{
//                         if(result){

                            
//                             const token = generateJWT({email: data[0].email, id: data[0].id, role: data[0].role});
//                             res.json({
//                                 status: "SUCCESS",
//                                 message: "signing successful",
//                                 data: {token, role: data[0].role,email: data[0].email}
//                             });
//                         }else{
//                             res.json({
//                             status:"FALIED",
//                             message:"invalid password"
//                         })
//                     }
//                 })
//                     .catch(error=>{
                    
//                         res.json({
//                             status:"FALIED",
//                             message:"an error occured while comparing the password"
//                         })
     
//                     })
                    

//                 }




//             }else{
//                 console.log(err)
//                 res.json({
//                     status:"FALIED",
//                     message:"invalid credentials entered!"
//                 })
//             }

            

//         })
//         .catch(error=>{
//             res.json({
//                 status:"FALIED",
//                 message:"An error occurred while checking for existing user  "
//             })
//         })
//     }
// }




const signin = (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Please enter your email address"
        });
    } else {
        User.findOne({ email: email })
            .then(data => {
                if (data) {
                    if (!data.verified) {
                        res.json({
                            status: "FAILED",
                            message: "Email has not been verified, please check your inbox"
                        });
                    } else {
                        const hashedPassword = data.password;
                        bcrypt.compare(password, hashedPassword)
                            .then(result => {
                                if (result) {
                                    // Update loggedIn status to true
                                    User.findByIdAndUpdate(data._id, { loggedIn: true })
                                        .then(updatedUser => {
                                            // Generate JWT token
                                            const token = generateJWT({ email: updatedUser.email, id: updatedUser._id, role: updatedUser.role });
                                            res.json({
                                                status: "SUCCESS",
                                                message: "Signing in successful",
                                                data: { token, role: updatedUser.role, email: updatedUser.email,loggedIn: updatedUser.loggedIn }
                                            });
                                        })
                                        .catch(error => {
                                            res.json({
                                                status: "FAILED",
                                                message: "An error occurred while updating user data"
                                            });
                                        });
                                } else {
                                    res.json({
                                        status: "FAILED",
                                        message: "Invalid password"
                                    });
                                }
                            })
                            .catch(error => {
                                res.json({
                                    status: "FAILED",
                                    message: "An error occurred while comparing the password"
                                });
                            });
                    }
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid credentials entered"
                    });
                }
            })
            .catch(error => {
                res.json({
                    status: "FAILED",
                    message: "An error occurred while checking for existing user"
                });
            });
    }
};








const logout = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: "FAILED",
                message: "Token missing"
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedToken) {
            return res.status(401).json({
                status: "FAILED",
                message: "Invalid token"
            });
        }
        await User.findByIdAndUpdate(decodedToken.id, { loggedIn: false });
        res.json({
            status: "SUCCESS",
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "FAILED",
            message: "An error occurred while logging out"
        });
    }
};






module.exports = {
    signup,
    sendVerificationEmail,
    verifyEmail,
    signin,
    logout,
    
};