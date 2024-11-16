const express = require('express');
const cors = require("cors");
const router = require("./Router/router");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require('bcrypt');
const connectDB = require('./Database/database');
const authRoutes = require('./Router/auth');

const app = express();

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(router);
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'));

app.use('/api', authRoutes);
app.use(router);

app.post('/signup', (req, res) => {
  try {
    const { username, email, password } = req.body;

  // console.log("Received /signup request with data:", req.body);
  
    const existingUser = User.findOne({ email });
    if (existingUser) {
    // console.error("Missing fields in signup request:", req.body); // Log error
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    newUser.save();

    res.status(200).json({ message: 'Signup successful!' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server is running on http://localhost:5000`));