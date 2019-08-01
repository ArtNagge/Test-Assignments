import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({message: 'none token'})
    }

    try {
        jwt.verify(authHeader, config.SECRET_KEY);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({message: 'invalid token'})
        }
    }

    next();
};