const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user=require('./models/usermodel');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your-database-uri' with your actual MongoDB URI)
mongoose.connect('mongodb://localhost:27017/watermetro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Middleware for parsing JSON data
app.use(bodyParser.json());

// Route for user registration
app.post('/register', async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle errors (e.g., duplicate email, validation errors)
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
