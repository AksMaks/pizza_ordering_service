const {Router} = require("express")
const router = Router()

const Level = require("../controllers/Level")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Level.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Level.Insert(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Level.Update(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Level.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router