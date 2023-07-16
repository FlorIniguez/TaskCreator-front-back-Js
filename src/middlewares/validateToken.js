const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRequired = (req, res, next) => {
  try {
    const { token } = req.cookies;
    //si no hay token
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    //verifica si el token esa ok o no
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { authRequired };
