import jwt from 'jsonwebtoken';

const homemiddleware = (req , res , next) => {
  try {
      const headers = req.headers["authorization"];
       if(!headers) {
        return res.status(401).json({
          success : false ,
          message : "Authorization header is missing"
        })
       }
       console.log("Headers: ", headers);
       const token = headers.split("")[1];
       if(!token) {
        console.log("Token is missing");
        return res.status(401).json({
          success : false ,
          message  : "Token is missing"
        })
       }
        console.log("Token: ", token);
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET_KEY);
        if(!decodedToken) {
          console.log("Invalid Token");
          return res.status(401).json({
            success : false ,
            message : "User is not authenticated"
          })
        }
        console.log("Decoded Token: ", decodedToken);
        req.userInfo = decodedToken;
        next();
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({
      success : false ,
      message : "Internal server error"
    })
  }
}

export default homemiddleware;