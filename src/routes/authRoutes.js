const express = require('express');
const usersDb = require('../database/userDb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
  console.log("hi");
  const { username, password } = req.body;
  
  const user = await usersDb.getUserByUsername(username);
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare the entered password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }


  const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });

  res.json({ token });
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  const existingUser = await usersDb.getUserByUsername(username);
  console.log("this is existing user",existingUser);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await usersDb.createUser(username, hashedPassword);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
// module.exports = router;
