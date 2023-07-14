module.exports = (request,response,next) =>{

  const allowedOrigins =  [
    "http://localhost:3000",
  ]

  const origin = request.header('Origin')
  const allow = allowedOrigins.includes(origin)

  if (allow){
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');
  }
  next()
}
