const jwt = require('jsonwebtoken');

// JWT secret key
const SECRET_KEY = 'your-secret-key';

// Middleware to authenticate JWT
exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = decoded;
    next();
  });
};
