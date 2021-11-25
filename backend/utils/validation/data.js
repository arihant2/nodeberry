import { body, validationResult } from 'express-validator';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';

export const validateDataUtility = tryCatchUtility(async(req, res, next) => {
    const signup = /^\/signup$/;
    const login = /^\/login$/;

    const { originalUrl:url } = req;

    if(signup.test(url) || login.test(url)) {
        await body('email','').isEmail().normalizeEmail().run(req);
        await body('password','').trim().isLength({ min: 8, max: 20 }).isAlphanumeric().run(req);
    }

    if(signup.test(url))
        await body('username','').trim().isLength({ max: 20 }).isAlphanumeric().run(req);

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    next();
});

