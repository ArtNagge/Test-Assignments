'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
    var authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'none token' });
    }

    try {
        _jsonwebtoken2.default.verify(authHeader, _config2.default.SECRET_KEY);
    } catch (e) {
        if (e instanceof _jsonwebtoken2.default.JsonWebTokenError) {
            return res.status(401).json({ message: 'invalid token' });
        }
    }

    next();
};