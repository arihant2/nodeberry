// for actions to be performed by authenticated users only (after logging in)

import jwt from "jsonwebtoken";

import { key } from "../../controllers/auth.js";

import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const validateTokenUtility = (req, res, next) => {   // check token validity
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : (req.params||{}).token;

    if(token === undefined)
        return res.status(401).send('Unauthorized');

    jwt.verify(token, key, (err, user) => {
        if(err) throw new generateErrUtility('Forbidden!',403);
        req.user = user;     // 'req.' adds data in it and use to send that data to next middleware
    });
    next();
};

