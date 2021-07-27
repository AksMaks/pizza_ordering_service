const {Router} = require("express")
const router = Router()

const Branch = require("../controllers/Branch")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Branch.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Branch.Insert(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Branch.Update(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Branch.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router