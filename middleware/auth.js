const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Get the token from the header (Authorization: Bearer <token>)
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  // Usually, tokens are sent as "Bearer TOKEN_STRING", so we split it
  const token = authHeader.split(' ')[1] || authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // This puts the user's ID into the request for later use
    next(); // Move to the next function (your controller)
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = authenticate;