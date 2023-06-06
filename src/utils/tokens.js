const jwt = require("jsonwebtoken");

const refreshTokens = {};
const secretKey = process.env.SECRET_KEY;
function generateAccessToken(id) {
  const accessToken = jwt.sign({ id: id }, secretKey, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESSTOKENTIME,
  });
  return accessToken;
}

function generateRefreshToken(userId) {
  const refreshToken = jwt.sign({ userId: userId }, secretKey,{
    expiresIn:process.env.REFRESHTOKENTIME
  });
  // refreshTokens[refreshToken] = userId;
  // console.log("refreshTokens", refreshTokens);
  return refreshToken;
}
module.exports = {
  refreshTokens,
  secretKey,
  generateAccessToken,
  generateRefreshToken,
};
