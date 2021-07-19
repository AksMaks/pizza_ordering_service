const jwt = require("jsonwebtoken")
const {jwtSecret} = require("config")

module.exports = (roles) => (req, res, next) => {
  if(roles.includes(req.body.user.IdRole)){
    next()
  }else{
    res.json({message: "У вас нет доступа"})
  }
}