const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const fetchUser = (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "enter vallid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("enter vallid token");
  }
};

module.exports = fetchUser;
