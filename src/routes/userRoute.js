const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const {
  refreshTokens,
  secretKey,
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokens");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

//routes

router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;
  try {
    console.log("adding user");
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.json({ message: "User couldnt register" });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const refreshToken = generateRefreshToken(user._id);
  const accessToken = generateAccessToken(user._id);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ refreshToken,username});
});

router.post("/refreshtoken", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if(!refreshToken){
    return res.json({err:"No refresh Token provided"})
  }
  console.log(refreshToken);
  // if (!refreshToken || !refreshTokens[refreshToken]) {
  //   return res.sendStatus(401);
  // }
  // const userId = refreshTokens[refreshToken];

  jwt.verify(refreshToken, secretKey, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    console.log(decoded)

    // Generate a new access token
    const accessToken = generateAccessToken(decoded.userId);
    // const newRefreshToken = generateRefreshToken(decoded.userId);
    return res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    }).json({ refreshToken: refreshToken });
  });
});

// Route for token revocation (logout)
router.get("/logout", async (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure:true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged out" });
  
});
module.exports = router;
