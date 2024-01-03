const jwt = require("jsonwebtoken");
//const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const JWT_SECRET = "passwordis$secure";
const fetchUser = (req, res, next) => {
  let token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "enter vallid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);

    // console.log("data",data)
    req.user = data.user;
    //  console.log("req.user",req.user)
    next();
  } catch (error) {
    res.status(401).send("enter vallid token");
  }
};

// const fetchUser = (req, res, next) =>
//   //Get user frm jwt token and add id to req object
//   {
//     const token = req.header("auth-token");

//     if (!token) {
//       res.status(401).send({ error: "Invalid Token" });
//     }
//     try {
//       const data = jwt.verify(token, JWT_SECRET);

//       req.user = data.user;

//       next();
//     } catch (error) {
//       res.status(401).send({ error: "Please authenticate with a valid token" });
//     }
//   };

module.exports = fetchUser;
