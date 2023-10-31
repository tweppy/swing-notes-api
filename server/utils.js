const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers?.authorization.replace("Bearer ", "");

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request object for use in your route handlers
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { auth };
