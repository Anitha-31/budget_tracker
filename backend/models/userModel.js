//userModel.js
const pool = require('../config/db');

const createUser = async (username, email, hashedPassword) => {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
};

const findUserById = async (userId) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};

const updateUserProfile = async (userId, username, profilePic) => {
    const query = 'UPDATE users SET username = $1, profile_pic = $2 WHERE id = $3 RETURNING *';
    const values = [username, profilePic, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserById, updateUserProfile };
