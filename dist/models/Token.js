'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TokenSchema = new _mongoose.Schema({
    tokenId: String,
    userId: String
});

var Token = _mongoose2.default.model('Token', TokenSchema);
exports.default = Token;