const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user');
const {sendResponseError} = require('../middleware/middleware')
const {checkPassword, newToken} = require('../utils/utility.function')
//const { Order } = require('../models/order');
//const { errorHandler } = require('../helpers/dbErrorHandler');

const signUpUser = async (req, res) => {
  const {name, email, password} = req.body
  try {
    const hash = await bcrypt.hash(password, 8)
    
    // Create user with explicit fields
    const newUser = await User.create({
      name: name,
      email: email,
      password: hash
    });

    console.log('User created:', newUser); // Add this log to verify user creation
    res.status(201).json({ message: 'Successfully account opened', user: newUser });
    return;
  } catch (err) {
    console.log('Error creating user:', err);
    // Check for duplicate email
    if (err.code === 11000) {
      sendResponseError(400, 'Email already exists', res);
      return;
    }
    sendResponseError(500, 'Something wrong please try again', res);
    return;
  }
}

const signInUser = async (req, res) => {
  const {password, email} = req.body
  
  if (!email || !password) {
    return sendResponseError(400, 'Email and password are required', res);
  }

  try {
    const user = await User.findOne({email})
    if (!user) {
      return sendResponseError(400, 'User not found. Please sign up first!', res)
    }

    const same = await checkPassword(password, user.password)
    if (same) {
      let token = newToken(user)
      return res.status(200).json({
        status: 'ok',
        token,
        user: {
          name: user.name,
          email: user.email
        }
      })
    }
    return sendResponseError(400, 'Invalid password!', res)
  } catch (err) {
    console.log('ERROR:', err)
    return sendResponseError(500, 'Server error. Please try again.', res)
  }
}

const getUser = async (req, res) => {
  res.status(200).send({user: req.user})
}
module.exports = {signUpUser, signInUser, getUser}