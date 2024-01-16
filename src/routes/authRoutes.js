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

router.post('/getUserFromToken', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, 'your-secret-key');

    // Extract username from the decoded token
    const username = decodedToken.username;

    // Retrieve user information from the database
    const user = await usersDb.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user information
    res.json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

router.get('/user-details', async (req, res) => {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided or invalid format' });
  }

  try {
    console.log("humpty dumpty");
    // Extract the token without the 'Bearer ' prefix
    const tokenWithoutBearer = token.split(' ')[1];

    // Verify the token using the secret key
    const decodedToken = jwt.verify(tokenWithoutBearer, 'your-secret-key');

    // Extract username from the decoded token
    const username = decodedToken.username;

    // Retrieve user information from the database
    const user = await usersDb.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user information
    console.log("these are user details",user);
    res.json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
// module.exports = router;
