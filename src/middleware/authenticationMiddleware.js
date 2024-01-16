const usersDb = require('../database/userDb');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');
    console.log("authorization middleware camenene here");
  if (!token) {
    console.log("unauth error");
    return res.status(401).json({ message: 'Unauthorized - Token missing' });
  }

  try {
    console.log("this is the token",token);
    const decoded = jwt.verify(token, 'your-secret-key');
    const user = await usersDb.getUserByUsername(decoded.username);

    if (!user) {
      console.log("authorization middleware came here-1");
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    console.log("authorization middleware came here-2");
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = authenticate;
