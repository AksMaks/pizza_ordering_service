const {Router} = require("express")
const router = Router()

const User = require("../controllers/User")
const ErrorHandler = require("../utils/ErrorHandler")

const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      console.log({authMiddleware: req.body})
      res.status(200).json(await User.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.post('/one', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.GetOne(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.post('/auth', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.Auth(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.post('/getCode', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.GetCode(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.post('/app', [], (req, res) => {
  let code = Math.round(Math.random() * (9999 - 1000) + 1000).toString()
  let data = {...(req.body)}
  data.Password = code
  try{
    (async () => {
      res.status(200).json(await User.Insert(data))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.post('/RefReg', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.RefReg(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.post('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.Insert(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.patch('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.Update(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router