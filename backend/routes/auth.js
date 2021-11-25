import express from 'express';

import { signupApi, verifyOtpAndCreateAccountApi, loginApi } from '../controllers/api.js';
import { validateDataUtility } from '../utils/validation/data.js';
// import multer from 'multer';

const router = express.Router();
// const upload = multer();

export default router
    .post('/signup',validateDataUtility,signupApi)
    .get('/verifyemail/:otp',verifyOtpAndCreateAccountApi)
    .post('/login',validateDataUtility,loginApi);

    // .post('/signup', upload.none(),validateDataUtility,signupApi)
    // .post('/verifyemail', upload.none(),verifyOtpAndCreateAccountApi)
    // .post('/login', upload.none(),validateDataUtility,loginApi);

