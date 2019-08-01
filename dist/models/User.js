'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose.Schema({
    name: String,
    email: String,
    pass: String
}, {
    timestamps: true
});

var User = _mongoose2.default.model('User', UserSchema);
exports.default = User;