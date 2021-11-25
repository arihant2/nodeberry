import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sendgridMail from '@sendgrid/mail';

import userModel from '../userModel.js';

import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../utils/errHandling/generateErr.js';

// sending otp to verify email
let systemOtp;
const sendOtpController = tryCatchUtility(async (res,email) => {
    const { SENDGRID_MAIL_APIKEY:sgm_key, sender_mail } = process.env;

    sendgridMail.setApiKey(sgm_key);

    systemOtp = String(Math.random()).split('.')[1].substring(1,7);

    // mail format
    const format = {
        to: email,
        from: { name: 'Nodeberry', email: sender_mail },
        subject: "Verify your email!",
        text: `Please use the below code to verify your email for creating account. ${systemOtp}`,
        html: `<h3>Please use the below code to verify your email for creating account.</h3><br><strong>${systemOtp}<strong>`
    };

    // sending mail
    const response = await sendgridMail.send(format);
    if(!response) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    res.status(202).send('Email verification mail sent!\nPlease verify email to create account...');
});

// signup
let newUser;
export const signupController =  tryCatchUtility(async (req, res) => {
    // checking if email already exists
    const existingEmail = await userModel.findOne({ email: req.body.email }, { _id: 1 }).lean();
    if(existingEmail) throw new generateErrUtility('Email already exists!',409);

    newUser = JSON.parse(JSON.stringify(req.body));       // deep copying object

    // encrypting password and adding it into user body
    delete newUser.password;
    newUser.password = await bcrypt.hash(req.body.password, 10);       // encrypt given password
    if(!newUser.password) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);

    // sending OTP to verify email
    sendOtpController(res,newUser.email);
});

// verify OTP to create account
export const verifyOtpAndCreateAccountController =  tryCatchUtility(async ({ params:{ otp:userOtp } }, res) => {
    if(systemOtp && newUser) {
        if(userOtp !== systemOtp) throw new generateErrUtility('Incorrect OTP!',401);       // verify user code

        // saving new user into user model
        const response = await userModel.create(newUser);
        if(!response) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);

        res.status(201).json({
            msg: 'Signup successful!',
            user: response
        });
    } else throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
});

// login
export let key;
export const loginController = tryCatchUtility(async ({ body:{ email, password } }, res) => {
    // check email
    const response = await userModel.findOne({ email }).lean();
    if(!response) throw new generateErrUtility('Invalid credentials!',401);

    // check password
    const isPassValid = await bcrypt.compare(password, response.password);
    if(!isPassValid) throw new generateErrUtility('Invalid credentials!',401);

    // create token
    key = process.env.SERVER_SECRET + String(Math.random()).split('.')[1];
    const token = jwt.sign(
        { userid: response._id, username: response.username, group: response.ownership },
        key,
        { expiresIn: "12h" }
    );
    if(!token) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);

    res.status(200).json({
        msg: `${response.username} logged in successfully!`,
        user_group: response.ownership,
        token
    });
});

