const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");
const Signup = require("./routes/signupRoute");
const Login = require('./routes/loginRoute')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/users', Signup)
app.use('/users/login', Login )


env.config();

port = process.env.PORT || 3005;
dbUrl = process.env.MONGO_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
