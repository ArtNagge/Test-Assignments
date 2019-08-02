import PostModel from '../models/Post';

export default class PostController {
    allPosts(req, res) {
        PostModel.find()
            .then((err, posts) => {
                if (err) return res.send(err);
                return res.json(posts);
            });
    }
    createPost(req, res) {
        const {title, body} = req.body;
        const post = new PostModel({title, body, description: body.substr(0, 100)});
        post.save().then(() => {res.send({post})});
    }
    readPost(req, res) {
        PostModel.findOne({_id: req.params.id})
            .then(post => {
                !post ? res.send({status: 'not found'}) : res.json(post)
            });
    }
    updatePost(req, res) {
        PostModel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            (err) => {err ? res.send(err) : res.json({status: "updated"})}
        );
    }
    deletePost(req, res) {
        PostModel.deleteOne({_id: req.params.id})
            .then(post => {
                post ? res.json({status: "deleted"}) : res.json({status: 'error'})
            });
    }
}