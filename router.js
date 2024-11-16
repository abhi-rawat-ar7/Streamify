require("dotenv").config();
require("../Database/database");
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("./auth");
const Channel = require("./channel");
const Videos = require("./videos");
const Likes = require("./likes");
const Comments = require("./comments");
const Studio = require("./studio");
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const router = express.Router();
// Middlewares
router.post('/signup', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the user
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});
router.get("/", (req, res) => {
  res.send('Hello, from the router!');
});
router.use(
  cors({
    origin: ["https://shubho-youtube-mern.netlify.app"],
    // origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(auth);
router.use(Channel);
router.use(Videos);
router.use(Likes);
router.use(Comments);
router.use(Studio);
module.exports = router;