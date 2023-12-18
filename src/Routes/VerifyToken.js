const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.json({ message: "your are not authenticated" });
  }
};

const verifyTokenAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.id === req.params.userId ||
      req.user.id === req.params.id ||
      req.user.isAdmin
    ) {
      console.log("true");
      next();
    } else {
      res.status(403).json("your are not allowed to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("verifyTokenAndAdmin");
    }
  });
};

module.exports = { verifyToken, verifyTokenAuth, verifyTokenAndAdmin };
