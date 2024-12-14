// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, findUserById, updateUserProfile } = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, email, hashedPassword);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving profile', error });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, profilePic } = req.body;
        const updatedUser = await updateUserProfile(userId, username, profilePic);
        res.json({ message: 'Profile updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

const logout = async (req, res) => {
    try {
        // Clear token on client-side (implementation varies depending on client setup)
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during logout', error });
    }
};

module.exports = { register, login, getProfile, updateProfile, logout };