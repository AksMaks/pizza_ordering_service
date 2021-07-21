const {Router} = require("express")
const router = Router()

const upload = require("../middleware/Upload")
const ProductOption = require("../controllers/ProductOption")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await ProductOption.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await ProductOption.Insert({...req.body, Url: req.file? req.file.path: req.body.OldImage}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await ProductOption.Update(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await ProductOption.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router