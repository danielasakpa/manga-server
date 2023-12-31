const User = require('../models/user');
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one user
const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a user
const createUser = async (req, res) => {
    try {
        // Hash the password before saving the user to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        // Hash the password before updating the user in the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const updatedUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };
        const user = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
};
