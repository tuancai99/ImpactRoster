import User from "../models/User.js";

const handleErrorResponse = (res, error, status = 500) => {
  console.error("Error:", error);
  res.status(status).json({ error: error.message });
};

// @desc Get all users
// @route GET /users
// @access Private
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// @desc Create a user
// @route POST /users
// @access Private
const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const createdUser = await User.create(newUser);

    res.status(201).json(createdUser);
  } catch (error) {
    handleErrorResponse(res, error, 500);
  }
};

// @desc Get a user
// @route GET /users/:id
// @access Private
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// @desc Delete a user
// @route DELETE /users/:id
// @access Private
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    handleErrorResponse(res, error, 500);
  }
};
// @desc Update a user
// @route PUT /users/:id
// @access Private
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserFields = req.body;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserFields);

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update user" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
// @desc Add all data to the database
// @route POST /users/
// @access Private
const addAll = async (req, res) => {
  try {
    const newUsers = req.body;

    // Assuming req.body is an array of user objects
    const createdUsers = await User.insertMany(newUsers);

    res.status(201).json(createdUsers);
  } catch (error) {
    handleErrorResponse(res, error, 500);
  }
};

export default {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
  addAll,
};
