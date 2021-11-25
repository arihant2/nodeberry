import requests from 'requests';

import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';

export const getCurrencyPriceController =  tryCatchUtility(async ({ params:{ currency } }, res) => {
    await requests('https://min-api.cryptocompare.com/data/price?fsym='+currency+'&tsyms=USD,EUR')
        .on('data', data => { if(data) res.status(200).send(data); })
        .on('end', err => {
            if(err) res.status(500).send('Connection closed due to '+err);
        });
});

