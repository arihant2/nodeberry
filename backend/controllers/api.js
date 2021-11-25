// auth
import { signupController, verifyOtpAndCreateAccountController, loginController } from './auth.js';

// currency pricing
// import { getBtcPriceController, getEthPriceController, getBnbPriceController } from './currencyPricing.js';
import { getCurrencyPriceController } from './currencyPricing.js';


// auth
export const signupApi = signupController;
export const verifyOtpAndCreateAccountApi = verifyOtpAndCreateAccountController;
export const loginApi = loginController;

// currency pricing
// export const getBtcPriceApi = getBtcPriceController;
// export const getEthPriceApi = getEthPriceController;
// export const getBnbPriceApi = getBnbPriceController;
export const getCurrencyPriceApi = getCurrencyPriceController;

