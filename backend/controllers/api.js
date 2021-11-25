// auth
import { signupController, verifyOtpAndCreateAccountController, loginController } from './auth.js';

// currency pricing
import { getCurrencyPriceController } from './currencyPricing.js';


// auth
export const signupApi = signupController;
export const verifyOtpAndCreateAccountApi = verifyOtpAndCreateAccountController;
export const loginApi = loginController;

// currency pricing
export const getCurrencyPriceApi = getCurrencyPriceController;

