const jwt = require("jsonwebtoken")
const {jwtSecret} = require("config")

module.exports = (req, res, next) => {
  if(req.method == "OPTIONS") next()
  
  try{
    const token = req.headers.authorization
    
    if(!token)res.json({message: "Пользователь не авторизован"})

    const decodeData = jwt.verify(token, jwtSecret)
    req.body.user = decodeData
    next()
  }catch(e){
    res.json({message: "Пользователь не авторизован"})
  }
}