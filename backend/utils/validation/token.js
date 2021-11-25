// for actions to be performed by authenticated users only (basically after logging in)

import jwt from "jsonwebtoken";

import { key } from "../../controllers/auth.js";

import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const validateTokenUtility = (req, res, next) => {   // check token validity
    // const { headers:{ authorization } } = req;
    // const { headers:{ authorization:auth }, params:{ token:code }={} } = req;
    // const { token } = req.params || req.headers.authorization;
    // const token = auth ? auth.split(' ')[1] : code;
    // const token = req.params ? req.params.token : req.headers.authorization.split(' ')[1];
    // console.log(req.headers);
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : (req.params||{}).token;

    if(token === undefined)
        return res.status(401).send('Unauthorized');

    // const token = auth.split(' ')[1];
    jwt.verify(token, key, (err, user) => {
        if(err) throw new generateErrUtility('Forbidden!',403);
        req.user = user;     // 'req.' adds data in it and use to send that data to next middleware
    });
    next();
};

