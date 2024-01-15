require("dotenv").config();
const express = require('express');
const programRoutes = require('./src/routes/programRoutes');
const authRoutes = require('./src/routes/authRoutes');


const __dirname=path.resolve();

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes); // Login route
app.use('/programs', programRoutes);
app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",(req,res)=>{
  res.sendFile(
    path.join(__dirname,"./client/build/index.html"),
    function(err){
      res.status(500).send(err)
    }
  )
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
