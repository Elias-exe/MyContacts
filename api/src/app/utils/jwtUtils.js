const jwt = require('jsonwebtoken');

function generateToken(request,response) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      time: Date(),
      userId: 12,
  }

  const token = jwt.sign(data, jwtSecretKey);
  response.send(token)
  return token;
}

function verifyToken(request,response) {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = request.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      return response.send("Sucessfully Verified")
    }else{
      return response.status(401).json({error})
    }
  }catch(error){
    return response.status(401).send(error);
  }
}

module.exports = { generateToken, verifyToken };
