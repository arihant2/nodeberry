import express from 'express';

import { signupApi, verifyOtpAndCreateAccountApi, loginApi } from '../controllers/api.js';
import { validateDataUtility } from '../utils/validation/data.js';

const router = express.Router();

export default router
/**
 * @swagger
 * /signup:
 *   post:
 *    description: Create a new account
 *    parameters:
 *    - name: username
 *      description: user name
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: user email
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: password
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *     202:
 *      description: Call '/verifyemail' to verify your email!
 *     422:
 *      description: Wrong input format for one of the fields!
 *     409:
 *      description: Email already exists!
 *     500:
 *      description: Something went wrong!
 */
    .post('/signup',validateDataUtility,signupApi)
/**
 * @swagger
 * /verifyemail/{otp}:
 *   get:
 *    description: Verify otp and create account
 *    parameters:
 *    - name: otp
 *      description: email verification code
 *      in: path
 *      required: true
 *      type: string
 *    responses:
 *     201:
 *      description: Signup successful!
 *     401:
 *      description: Incorrect OTP!
 *     500:
 *      description: Something went wrong!
 */
    .get('/verifyemail/:otp',verifyOtpAndCreateAccountApi)
/**
 * @swagger
 * /login:
 *   post:
 *    description: login to account
 *    parameters:
 *    - name: email
 *      description: user email
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: password
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *     200:
 *      description: logged in successfully!
 *     422:
 *      description: Wrong email or password format!
 *     401:
 *      description: Invalid credentials!
 *     500:
 *      description: Something went wrong!
 */
    .post('/login',validateDataUtility,loginApi);

