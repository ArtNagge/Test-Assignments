'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Auth = require('./middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _UserController = require('./controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _PostController = require('./controllers/PostController');

var _PostController2 = _interopRequireDefault(_PostController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
// imports
var User = new _UserController2.default();
var Post = new _PostController2.default();

var app = (0, _express2.default)();

// middleware
app.use((0, _cors2.default)());
_mongoose2.default.connect(_config2.default.DB_LINK, { useNewUrlParser: true });
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// routs
app.post('/api/signup', User.singUp);
app.post('/api/signin', User.singIn);

app.route('/api/posts').get(Post.allPosts).post(_Auth2.default, Post.createPost);

app.route('/api/posts/:id').get(Post.readPost).delete(_Auth2.default, Post.deletePost).put(_Auth2.default, Post.updatePost);

// start server
app.listen(_config2.default.PORT, function () {
    console.log('server started');
});