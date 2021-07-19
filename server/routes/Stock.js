const {Router} = require("express")
const router = Router()

const upload = require("../middleware/Upload")
const Stock = require("../controllers/Stock")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Stock.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], upload.Stock.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Stock.Insert({...req.body, Url: req.file.path}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], upload.Stock.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Stock.Update({...req.body, Url: req.file.path}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Stock.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router