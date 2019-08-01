'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Post = require('../models/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PostController = function () {
    function PostController() {
        _classCallCheck(this, PostController);
    }

    _createClass(PostController, [{
        key: 'allPosts',
        value: function allPosts(req, res) {
            _Post2.default.find().then(function (err, posts) {
                if (err) return res.send(err);
                return res.json(posts);
            });
        }
    }, {
        key: 'createPost',
        value: function createPost(req, res) {
            var _req$body = req.body,
                title = _req$body.title,
                body = _req$body.body;

            var post = new _Post2.default({ title: title, body: body, description: body.substr(0, 100) });
            post.save().then(function () {
                res.send({ status: "ok" });
            });
        }
    }, {
        key: 'readPost',
        value: function readPost(req, res) {
            _Post2.default.findOne({ _id: req.params.id }).then(function (post) {
                !post ? res.send({ status: 'not found' }) : res.json(post);
            });
        }
    }, {
        key: 'updatePost',
        value: function updatePost(req, res) {
            _Post2.default.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
                err ? res.send(err) : res.json({ status: "updated" });
            });
        }
    }, {
        key: 'deletePost',
        value: function deletePost(req, res) {
            _Post2.default.deleteOne({ _id: req.params.id }).then(function (post) {
                post ? res.json({ status: "deleted" }) : res.json({ status: 'error' });
            });
        }
    }]);

    return PostController;
}();

exports.default = PostController;