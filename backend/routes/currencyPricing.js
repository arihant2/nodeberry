import express from 'express';

// import { getBtcPriceApi, getEthPriceApi, getBnbPriceApi } from '../controllers/api.js';
import { getCurrencyPriceApi } from '../controllers/api.js';
import { validateTokenUtility } from '../utils/validation/token.js';

const router = express.Router();

export default router
    .get('/currencypricing/:token',validateTokenUtility,({ params:{ token } },res) => {
        // console.log('token',token);
        res.status(200).render('index',{ token });
    })
    // .get('/btc',validateTokenUtility,getBtcPriceApi)
    // .get('/eth',validateTokenUtility,getEthPriceApi)
    // .get('/bnb',validateTokenUtility,getBnbPriceApi);
/**
 * @swagger
 * /{currency}:
 *   get:
 *    description: Check currency prices - BTC, ETH, BNB
 *    parameters:
 *    - name: currency
 *      description: currency to check
 *      in: path
 *      required: true
 *      type: string
 *    - name: Authorization
 *      description: access token - add 'bearer ' before token
 *      in: header
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    responses:
 *     200:
 *      description: Ok!
 *     401:
 *      description: Access not allowed!
 *     403:
 *      description: Access not allowed!
 *     500:
 *      description: Something went wrong!
 */
    .get('/:currency(btc|eth|bnb)',validateTokenUtility,getCurrencyPriceApi);

