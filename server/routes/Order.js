const {Router} = require("express")
const router = Router()

const Order = require("../controllers/Order")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Order.GetAll(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/get', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Order.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/insert', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Order.Insert(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router