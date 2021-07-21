const {Router} = require("express")
const router = Router()

const upload = require("../middleware/Upload")
const Cooperation = require("../controllers/Cooperation")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Cooperation.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], upload.Cooperation.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Cooperation.Insert({...req.body, Url: req.file? req.file.path: req.body.OldImage}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], upload.Cooperation.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Cooperation.Update({...req.body, Url: req.file? req.file.path: req.body.OldImage}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Cooperation.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router