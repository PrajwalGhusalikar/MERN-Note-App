const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetchuser = require("../middleware/getuser");

// const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const JWT_SECRET = "passwordis$secure";
//console.log("JWT_SECRET",JWT_SECRET)

//user api
router.post(
  "/createuser",
  [
    body("name", "entered invalid name").isString(),
    body("email", "entered invalid email").isEmail(),
    body("password", "entered invalid password").isStrongPassword(),
  ],
  async (req, res) => {
    // console.log(req.body);

    const errors = validationResult(req);
    // console.log("errors", errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), msg: errors.message });
    }

    try {
      let user = await Users.findOne({ email: req.body.email });
      // console.log("user", user);
      if (user) {
        return res.status(400).json({ errors: "email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      let securedPass = await bcrypt.hash(req.body.password, salt);
      let userRes = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      // console.log("userRes", userRes);
      const data = {
        user: {
          id: Users.id,
        },
      };
      const jwtToken = jwt.sign(data, JWT_SECRET);

      // .then(users => res.json(users))
      // .catch(err=> console.log(err));
      return res.json({ jwtToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
    // const user= new Users(req.body)
    // user.save()
  }
);

//login credintatials

router.post(
  "/login",
  [
    body("email", "entered invalid email").isEmail(),
    body("password", "password Must required").isStrongPassword().exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await Users.findOne({ email });
      //  console.log("user",user)
      if (!user) {
        return res.status(400).json({ errors: "Enter valid email to login" });
      }

      let passwordCmp = await bcrypt.compare(password, user.password);

      if (!passwordCmp) {
        return res
          .status(400)
          .json({ errors: "Enter valid password to login" });
      }
      //  console.log("Users.id",Users.id)
      //  console.log("user.id",user.id)
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtToken = jwt.sign(data, JWT_SECRET);

      // .then(users => res.json(users))
      // .catch(err=> console.log(err));
      return res.json({ jwtToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Route-3 get user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    console.log("userid", userId);
    let user = await Users.findById(userId).select("-password");
    console.log(user);
    return res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// router.post("/getuser", fetchuser, async (req, res) => {
//   try {

//     const userId = req.user;
//    console.log({userId})
//     const user = await Users.findById(userId.id).select("-password");
//     res.send(user);

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });
module.exports = router;
