import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    const {username, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch(e) {
        res.status(400).json({
            status: 'Error'
        })
    }
};

export const login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});

        if(!user) {
            return res.status(404).json({
                status: 'Error',
                message: 'user not found'
            });
        }
        
        const isCorrect = await bcrypt.compare(password, user.password);

        if(isCorrect) {
            req.session.user = user;
            res.status(200).json({
                status: 'success'
            });
        } else {
            res.status(400).json({
                status: 'Error',
                message: 'incorrect username or password'
            });
        }
    } catch(e) {
        res.status(400).json({
            status: 'Error'
        })
    }
};
