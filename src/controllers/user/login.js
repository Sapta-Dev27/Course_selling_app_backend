import user from "../../models/user.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import bcrypt from "bcryptjs";

const generateAccessToken = async(user) => {
   const token = jwt.sign({
    userId_from_accessToken : user._id,
    userName_from_accessToken : user.userName,
    userEmail_from_accessToken : user.userEmail,
    userRole_from_accessToken : user.userRole
   } , 
    process.env.JWT_SECRET_KEY,
   {
    expiresIn : process.env.JWT_SECRET_KEY_EXPIRY
   })

   return token ;
}
const generateRefreshToken = async(user) => {
   const token = jwt.sign({
    userId_from_refreshToken : user._id,
    userName_from_refreshToken : user.userName,
    userEmail_from_refreshToken : user.userEmail,
    userRole_from_refreshToken : user.userRole
   } , 
    process.env.JWT_SECRET_KEY_REFRESH,
   {
    expiresIn : process.env.JWT_SECRET_KEY_REFRESH_EXPIRY
   })

   return token ;
}

const loginUser = async(req , res) => {
  try {
     const {username , userpassword} = req.body;
     if( username == undefined || userpassword == undefined) {
      return res.status(400).json( {
        success : false ,
        message : "Please provide all required fields"
      })
     }
     const checkUser = user.find( {
      userName : username
     })
     if(!checkUser) {
      return res.status(400).json({
        success : false ,
        message : "User does not exist with this username"
      })
     }
     const checkPassword = await bcrypt.compare( userpassword , checkUser.userPassword)
     if(!checkPassword) {
      return res.status(400).json({
        success : false ,
        message : "Incorrect password"
      })
     }

     const accessToken = await generateAccessToken(checkUser);
     const refreshToken = await generateRefreshToken(checkUser);

     if ( accessToken && refreshToken)  {
      return res.status(200).json({
        success : true ,
        message : "User logged in successfully",
        loggedInUser : checkUser,
        accessToken : accessToken,
        refreshToken : refreshToken
      })
     }

     return res.status(500).json({
      success : false ,
      message : "Logged in failed"
     })
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({
      success : false ,
      message : "Internal server error"
    })
  }
}

export default loginUser;