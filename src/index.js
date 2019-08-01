// imports
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import AuthMiddleWare from './middleware/Auth';

// controllers
import UserController from './controllers/UserController';
import PostController from "./controllers/PostController";
const User = new UserController;
const Post = new PostController;

const app = express();

// middleware
app.use(cors());
mongoose.connect(config.DB_LINK, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routs
app.post('/api/signup', User.singUp);
app.post('/api/signin', User.singIn);

app.route('/api/posts')
    .get(Post.allPosts)
    .post(AuthMiddleWare, Post.createPost);

app.route('/api/posts/:id')
    .get(Post.readPost)
    .delete(AuthMiddleWare, Post.deletePost)
    .put(AuthMiddleWare, Post.updatePost);

// start server
app.listen(
    config.PORT,
    () => {console.log('server started')}
);