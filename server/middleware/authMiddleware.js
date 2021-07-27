const jwt = require("jsonwebtoken")
const {jwtSecret} = require("config")

module.exports = (req, res, next) => {
  if(req.method == "OPTIONS") next()
  
  try{
    const token = req.headers.authorization
    
    if(!token)res.json({message: "Пользователь не авторизован"})
    
    req.body.user = jwt.verify(token, jwtSecret)
    next()
  }catch(e){
    res.json({message: "Пользователь не авторизован"})
  }
}