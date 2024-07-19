const schemas = require("../schemas/usersSchema");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  // get all users
  try {
    const allUsers = await User.find({}).select('-password').exec();
    // return all users
    return res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;

  try {
    // find the user that matches this id
    const found = await User.findById(id).select('-password').exec();
    // found
    if (found) {
      // return the user found
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `user id ${id} not found`,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: "Invalid format for user id",
    });
  }
};

// const searchInUsers = async (req, res) => {
//
//   // validate the request's body using joi
//   const { error, value } = schemas.searchUser.validate(req.body);
//   // check if there are joi validation errors
//   if (error) {
//     const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
//     return res.status(400).json({ success: false, message: errorsArray });
//   }
//   // destructuring the variables from 'value'
//   const { searchTerm, searchFields } = value;
//
//   try {
//     // find the users containing the 'searchTerm' using our static 'multipleFieldsStringSearch' method
//     const found = await User.multipleFieldsStringSearch(searchTerm,searchFields);
//     // return the results (an empty array if not found)
//     return res.status(found.length !== 0 ? 200 : 204).json({
//       success: true,
//       data: found,
//     });
//   } catch (err) {
//     // return an error message
//     return res.status(400).json({ success: false, message: err.message });
//   }
// };

const createNewUser = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.createNewUser.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // create a new User instance (it's only in memory- until we actually save it)
  const newUser = new User(value);
  // save the user to database
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    // save user to database
    const saved = await newUser.save();

    // convert the document (created user) to standard javascript object
    const savedObject = saved.toObject();
    // now we can delete the 'password' key before returning the object to the user
    delete savedObject.password;

    // success ! return a response
    return res.status(201).json({ success: true, created: savedObject, });
  } catch (err) {
    // handle duplicate (existing) email
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: `email ${newUser.email} is already registered! consider logging in.` })
    }
    // error
    return res.status(500).json({ success: false, message: `error saving the user` });
  }
};

const deleteUser = async (req, res) => {
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;
  // try to handle errors
  try {
    const deleted = await User.findByIdAndDelete(id).select('-password').exec();
    if (!deleted) throw new Error();
    // found & deleted
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res.status(404).json({ success: false, message: `user id ${id} not found` });
  }
};

const updateUser = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.updateUser.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;
  try {
    const updated = await User.findByIdAndUpdate(id, value, { new: true }).select('-password').exec();
    // not found- return a response and stop execution
    if (!updated)
      return res.status(404).json({ success: false, message: `user id ${id} was not found.` });
    // found- return a response
    return res.status(200).json({ success: true, updated: updated, });
  } catch (err) {
    return res
      .status(404).json({ success: false, message: `user id ${id} was not found.` });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  //searchInUsers,
  createNewUser,
  deleteUser,
  updateUser,
};
