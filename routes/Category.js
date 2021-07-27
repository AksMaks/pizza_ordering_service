const {Router} = require("express")
const router = Router()

const Category = require("../controllers/Category")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Category.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Category.Insert(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Category.Update(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Category.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router