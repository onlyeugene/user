const Users = require("../model/user");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
// const modelUser = require('../model/user')

env.config();

// post a user || create a user

const signup = async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;
    if (!fullname || !email || !username || !password) {
      return res.status(400).json({ message: "Please fill in all details" });
    }

    //hash  the password
    const hashedPassword = await argon.hash(password);

    const user = await Users.create({
      fullname,
      email,
      username,
      password: hashedPassword,
    });
    //generate a token
    secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });

    res.status(201).json({ message: "User created", user, token });
  } catch (error) {
    res.status(500).json({ message: "Unable to create a user", error });
  }
};

// get users

const getUser = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json({
      message: "Users found",
      users,
      NumberOfUser: users.length,
    });
  } catch (error) {
    res.status(400).json({ message: "Unable to get users", error });
  }
};

//get users by id
const userGet = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.findById(id);
    res.status(200).json({
      message: "User found",
      users,
      NumberOfUser: users.length,
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      error,
    });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.findByIdAndDelete(id);
    res.status(200).json({
      message: "user deleted succesfully",
      users,
    });
  } catch (error) {
    res.status(404).json({ message: "User not found", error });
  }
};

//update a user

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found but you can create a user" });
    }
    const updatedUser = await Users.findById(id);
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(404).json({ message: "User not updated", error });
  }
};

// Edit the user password  seperately

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ message: "Please enter a new password" });
    }

    // hash the password
    const hashedPassword = await argon.hash(newPassword);

    // update the user's password in the database
    const updateUser = await Users.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(404).json({ message: "User not found", error });
  }
};

module.exports = {
  signup,
  getUser,
  userGet,
  deleteUser,
  updateUser,
  updatePassword
};
