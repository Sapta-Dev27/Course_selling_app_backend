import user from '../../models/user.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const generateAccessToken = async (newUser) => {
  const accessToken = jwt.sign({
    userId: newUser._id,
    userName_from_accessToken: newUser.userName,
    userEmail_from_access_token: newUser.userEmail,
    userRole_from_access_token: newUser.userRole
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_SECRET_KEY_EXPIRY
  })
}
const generateRefreshToken = async (newUser) => {
  const refreshToken = jwt.sign({
    userId: newUser._id,
    userName_from_refreshToken: newUser.userName,
    userEmail_from_refresh_token: newUser.userEmail,
    userRole_from_refresh_token: newUser.userRole
  }, process.env.JWT_SECRET_KEY_REFRESH, {
    expiresIn: process.env.JWT_SECRET_KEY_REFRESH_EXPIRY
  })
}

const registerUser = async (req, res) => {
  try {
    const { username, useremail, userpassword, userole } = req.body;
    if (username == undefined || useremail == undefined || userpassword == undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      })
    }
    const checkExistingUser = await user.find({
      userName: username
    })
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this username"
      })
    }
    const checkExistingEnail = await user.find({
      userEmail: useremail
    })
    if (checkExistingEnail) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userpassword, salt);

    const newuser = await user.create({
      userName: username,
      userEmail: useremail,
      userPassword: hashedPassword,
      userRole: userole || "user",

    })

    const accessToken = await generateAccessToken(newuser);
    const refreshToken = await generateRefreshToken(newuser);

    if (newuser) {
      console.log("User created successfully ");
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        createdUser: newuser,
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    }
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export default registerUser;