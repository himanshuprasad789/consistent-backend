const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils/tokens");

function verifyToken(req, res, next) {
    // console.log(req.cookies.accessToken)
    const authHeader =  req.cookies.accessToken;
    if (authHeader) {
        const token =  req.cookies.accessToken;

       jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.userId = decoded.id;
        next(); 
      });
    } else {
      // console.log("unauth")
      res.sendStatus(401);
    }
  }

  module.exports=verifyToken