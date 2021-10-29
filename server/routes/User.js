const {Router} = require("express")
const router = Router()

const User = require("../controllers/User")
const ErrorHandler = require("../utils/ErrorHandler")

const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

router.get('/', [], authMiddleware, (req, res) => {
  try{
    (async () => {
      console.log({authMiddleware: req.body})
      res.status(200).json(await User.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.get('/one', [], authMiddleware, (req, res) => {
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
router.post('/authApp', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.AuthApp(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})
router.post('/', [], authMiddleware, (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.Insert(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], authMiddleware, (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.Update(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], authMiddleware, (req, res) => {
  try{
    (async () => {
      res.status(200).json(await User.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router