import express from 'express';

import authRoute from './auth.js';
import currencyPricingRoute from './currencyPricing.js';

import { generateErrUtility } from '../utils/errHandling/generateErr.js';
import { printErrUtility } from '../utils/errHandling/printErr.js';


const router = express.Router();

router.get(/^\/(home)*$/, (_,res) => res.status(200).render('index',{ token: null }));
// router.get('/', (_,res) => res.status(200).render('index',{ token: null }));
// router.get('/currencypricing/:token', ({ params:{ token } },res) => {
//     console.log('token',token);
//     res.status(200).render('index',{ token });
// });

// router.use('/',authRoute);
router.use(/^(\/home)*/,authRoute);
// router.use('/',currencyPricingRoute);
router.use(/^(\/home)*/,currencyPricingRoute);


// for invalid urls
router.all('*', req => {
    throw new generateErrUtility(`Requested url: [${req.method}] ${req.headers.host + req.originalUrl} doesn't exist!`,404); // directly passing err to global err handler & printer written below, without using 'next(err)'
});

// express err handler, global err format for printing user defined errs
router.use(printErrUtility);

export default router;

