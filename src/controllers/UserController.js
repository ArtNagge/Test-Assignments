import UserModel from '../models/User';
import bCrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

export default class UserController {
    singIn(req, res) {
        const {email, pass} = req.body;
        UserModel.findOne({email})
            .then(
                user => {
                    if (!user) {
                        res.status(401).json({message: 'User not found'})
                    } else {
                        const isValid = bCrypt.compareSync(pass, user.pass);
                        if (isValid) {
                            const token = jwt.sign({id: user._id.toString()}, config.SECRET_KEY, { expiresIn: "7d" });
                            res.json({login: user.name, token});
                        }
                        else {
                            res.status(401).json({message: 'User not found'})
                        }
                    }
                }
            );
    }
    singUp(req, res) {
        const {name, email, pass} = req.body;
        UserModel.findOne({email})
            .then((user) => {
                if (user) return res.status(401).json({message: 'Пользователь уже существует'});
                bCrypt.genSalt(12, function(err, salt) {
                    bCrypt.hash(pass, salt, function(err, hash) {
                        const post = new UserModel({name, email, pass: hash});
                        const token = jwt.sign({id: post._id.toString()}, config.SECRET_KEY, { expiresIn: "7d" });
                        post.save().then(() => {
                            res.json({login: name, token: token});
                        });
                    });
                });
            });
    }
}

