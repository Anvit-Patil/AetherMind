const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.header('Authorization');
  // console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1]; // Split "Bearer <token>"

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add user from payload
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
