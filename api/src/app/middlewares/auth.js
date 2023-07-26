const jwt = require('jsonwebtoken');
const AccountRepository = require("../repositories/AccountRepository");

module.exports = async(request,response,next) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = request.header('Authorization');

  if(!token) {
    return response.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    const id = decoded.id;
    const User = await AccountRepository.findById({ id })

    if(!User){
      return response.sendStatus(401);
    }

    request.account = User;
    next();
    return response.sendStatus(200);
  }catch(error){
    return response.status(401).send(error);
  }
}
