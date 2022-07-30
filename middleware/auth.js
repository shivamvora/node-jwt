const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new BadRequestError("No token provided.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, username: decoded.username, token };
    next();
  } catch (error) {
    throw new BadRequestError("Not authorized to access this route.");
  }
};

module.exports = authenticationMiddleware;
