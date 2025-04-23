//Controller functions for users
// Handle request validation or formatting and call Services
const userService = require("../services/userServices.js");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "No such user found." });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newData = req.body;
    const createUser = await userService.createUser(newData);
    res.status(201).json(createUser);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const newData = req.body;
    const updatedUser = await userService.updateUser(id, newData);
    if (!updatedUser) {
      res
        .status(404)
        .json({ message: "User not found or no changes were applied." });
    }
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deletedUser = await userService.deleteUser(id);
    if (deletedUser.deletedCount === 0) {
      res.status(404).json({ message: "User was not found & deleted." });
    }
    res.json({ message: "User was deleted." });
  } catch (error) {
    next(error);
  }
};
