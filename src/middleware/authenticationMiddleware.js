const usersDb = require('../database/userDb');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    console.log("unauth error");
    return res.status(401).json({ message: 'Unauthorized - Token missing' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    const user = await usersDb.getUserByUsername(decoded.username);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = authenticate;
