import jwt from 'jsonwebtoken';

const adminMiddleware = (req , res , next) => {
  try {
      const role = req.userInfo.userRole_from_accessToken;
      if(role == "admin") {
        next();
      }
      return res.status(403).json({
        success : false ,
        message : "Access denied. Admins only."
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

export default adminMiddleware;;