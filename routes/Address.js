const {Router} = require("express")
const router = Router()

const Address = require("../controllers/Address")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Address.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Address.Insert(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Address.Update(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Address.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router