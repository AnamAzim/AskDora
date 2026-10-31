const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "User not Found!"
    });
  }

  try {
    const data = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = data.userId;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "You are Logged Out!"
    });
  }
}

module.exports = authMiddleware;