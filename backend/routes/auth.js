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
let success= false
//user api
router.post(
  "/createuser",
  [
    body("name", "Name is invalid").isString(),
    body("email", "Email is invalid").isEmail(),
    body("password", "Password is invalid, Use Strong password").isStrongPassword(),
  ],
  async (req, res) => {
 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), msg: errors.message });
    }

    try {
      let user = await Users.findOne({ email: req.body.email });
   
      if (user) {
        return res.status(400).json({ errors: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      let securedPass = await bcrypt.hash(req.body.password, salt);
      let userRes = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });
      const data = {
        user: {
          id: userRes.id,
        },
      };
      const jwtToken = jwt.sign(data, JWT_SECRET);
        if(jwtToken) {success=true}
        else{success=false}
      return res.json({ success ,jwtToken });
    } catch (error) {
      success=false
      console.error(error.message);
      res.status(500).send(success,"Internal Error Occured");
    }
  }
);

//login credintatials
router.post(
  "/login",
  [
    body("email", "Entered invalid email").isEmail(),
    body("password", "Password is required").isStrongPassword().exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await Users.findOne({ email });
     
      if (!user) {
        success=false
        return res.status(400).json({ success, errors: "Enter valid email to login" });
      }
  
      let passwordCmp = await bcrypt.compare(password, user.password);

      if (!passwordCmp) {
        
        return res
          .status(400)
          .json({ errors: "Enter valid password to login" });
      }
   
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtToken = jwt.sign(data, JWT_SECRET);

      success=true
      return res.json({ success,jwtToken });
    } catch (error) {
      success=false
      console.error(error.message);
      return res.status(500).send(success,"Internal Error Occured");
    }
  }
);

//Route-3 get user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;

    let user = await Users.findById(userId).select("-password");
   
    return res.send(user);
  } catch (error) {
    success=false
    console.error(error.message);
    res.status(500).send(success,"Internal Error Occured");
  }
});

module.exports = router;
