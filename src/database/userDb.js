const { Pool } = require('pg');
const User = require('../models/user');

const pool = new Pool({
  user: 'postgresql',
  host: '34.136.209.102',
  database: 'hero_wired_assignment_database',
  password: 'Vasu@123',
  port: 5432,
});

const getUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

  if (result.rows.length === 0) {
    console.log("came here");
    return null;
  }

  const user = result.rows[0];
  console.log(user);
  return new User(user.id, user.username, user.password);
};

const createUser = async (username, password) => {
  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    const newUser = result.rows[0];
    return new User(newUser.id, newUser.username, newUser.password);
  } catch (error) {
    // throw error;
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    await pool.query(query);
    console.log('Table "users" created successfully.');
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    const newUser = result.rows[0];
    return new User(newUser.id, newUser.username, newUser.password);

  }
};

module.exports = {
  getUserByUsername,
  createUser,
};

