const User = require('../models/user');
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

// Get one user
const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User Not Found', message: 'User with the given ID not found' });
        }
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

// Create a user
const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Bad Request', message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await user.save();
        res.status(204);
    } catch (err) {
        res.status(400).json({ error: 'Bad Request', message: err.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        console.log(req.params)
        const existingUser = await User.findById(req.params.userId);
        if (!existingUser) {
            return res.status(404).json({ error: 'User Not Found', message: 'User with the given ID not found' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const updatedUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };

        const user = await User.findByIdAndUpdate(req.params.userId, updatedUser, { new: true });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });

    } catch (err) {
        res.status(400).json({ error: 'Bad Request', message: err.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User Not Found', message: 'User with the given ID not found' });
        }
        res.status(204);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};


module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
};
