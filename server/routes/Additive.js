const {Router} = require("express")
const router = Router()

const upload = require("../middleware/Upload")
const Additive = require("../controllers/Additive")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Additive.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], upload.Additive.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Additive.Insert({...req.body, Url: req.file.path}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], upload.Additive.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Additive.Update({...req.body, Url: req.file.path}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Additive.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router