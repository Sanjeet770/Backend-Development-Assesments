const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Import User model
const User = require('./models/User');

// JWT secret key
const SECRET_KEY = 'your-secret-key';

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Signup
exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Generate and send OTP to the user's email
    const otp = Math.floor(1000 + Math.random() * 9000);
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Your OTP for email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered successfully', otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    // Implement login logic here
    // ...

    // Generate JWT
    const token = jwt.sign({ email: 'user-email' }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify the JWT
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Implement email verification logic here
      // ...

      res.json({ message: 'Email verified successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
