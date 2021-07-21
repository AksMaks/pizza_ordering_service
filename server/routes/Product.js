const {Router} = require("express")
const router = Router()

const upload = require("../middleware/Upload")
const Product = require("../controllers/Product")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Product.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], upload.Product.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Product.Insert({...req.body, Url: req.file? req.file.path: req.body.OldImage}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], upload.Product.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Product.Update({...req.body, Url: req.file? req.file.path: req.body.OldImage}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Product.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router