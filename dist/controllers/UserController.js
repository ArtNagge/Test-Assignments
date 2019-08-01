'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);
    }

    _createClass(UserController, [{
        key: 'singIn',
        value: function singIn(req, res) {
            var _req$body = req.body,
                email = _req$body.email,
                pass = _req$body.pass;

            _User2.default.findOne({ email: email }).then(function (user) {
                if (!user) {
                    res.status(401).json({ message: 'User not found' });
                } else {
                    var isValid = _bcrypt2.default.compareSync(pass, user.pass);
                    if (isValid) {
                        var token = _jsonwebtoken2.default.sign({ id: user._id.toString() }, _config2.default.SECRET_KEY, { expiresIn: "7d" });
                        res.json({ login: user.name, token: token });
                    } else {
                        res.status(401).json({ message: 'User not found' });
                    }
                }
            });
        }
    }, {
        key: 'singUp',
        value: function singUp(req, res) {
            var _req$body2 = req.body,
                name = _req$body2.name,
                email = _req$body2.email,
                pass = _req$body2.pass;

            _User2.default.findOne({ email: email }).then(function (user) {
                if (user) return res.status(401).json({ message: 'Пользователь уже существует' });
                _bcrypt2.default.genSalt(12, function (err, salt) {
                    _bcrypt2.default.hash(pass, salt, function (err, hash) {
                        var post = new _User2.default({ name: name, email: email, pass: hash });
                        var token = _jsonwebtoken2.default.sign({ id: post._id.toString() }, _config2.default.SECRET_KEY, { expiresIn: "7d" });
                        post.save().then(function () {
                            res.json({ login: name, token: token });
                        });
                    });
                });
            });
        }
    }]);

    return UserController;
}();

exports.default = UserController;