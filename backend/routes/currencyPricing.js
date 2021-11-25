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
    .get('/:currency(btc|eth|bnb)',getCurrencyPriceApi);

