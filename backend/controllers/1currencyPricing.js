import requests from 'requests';

// import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../utils/errHandling/generateErr.js';

function common(res, currency) {
// const common = tryCatchUtility(async (res, currency) => {
    requests('https://min-api.cryptocompare.com/data/price?fsym='+currency+'&tsyms=USD,EUR')
        .on('data', data => res.status(200).send(data))
        .on('end', err => {
            if(err) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
        });
}

// export const getBtcPriceController =  tryCatchUtility(async (req, res) => {
export const getBtcPriceController = (_, res) =>
    // console.log('->');
    // const response = await requests('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR');
    // console.log(response,response.data);
    // await requests('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR', (err, res, data) => {
        //     if(err) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
        //     console.log(data);
        // });
    /*await requests('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR')
        .on('data', data => res.status(200).send(data))
        .on('end', err => {
            if(err) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
        });*/
    common(res,'BTC');
    // res.sendStatus(200);
// });

// export const getEthPriceController =  tryCatchUtility(async (req, res) => {
export const getEthPriceController = (_, res) =>
/*await requests('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR')
        .on('data', data => res.status(200).send(data))
        .on('end', err => {
            if(err) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
        });*/
    common(res,'ETH');
// });

// export const getBnbPriceController =  tryCatchUtility(async (req, res) => {
export const getBnbPriceController = (_, res) =>
// await requests('https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD,EUR')
    //     .on('data', data => res.status(200).send(data))
    //     .on('end', err => {
    //         if(err) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    //     });
    common(res,'BNB');
// });

