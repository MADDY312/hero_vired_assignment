// import require from express;
require("dotenv").config();
const express = require('express');
const programRoutes = require('./routes/programRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes); // Login route
app.use('/programs', programRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
