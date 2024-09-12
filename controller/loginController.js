const userLogin = require("../model/user");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();

const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Look for user by email or username
        const user = await userLogin.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ message: 'User not found, kindly sign up.' });
        }

        // Verify password
        const passwordValid = await argon.verify(user.password, password);
        if (!passwordValid) {
            return res.status(401).json({ message: 'Password incorrect' });
        }

        // Create JWT token
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
        res.status(202).json({ message: 'Login Successful', user, token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging you in.', error });
    }
};

module.exports = { login };