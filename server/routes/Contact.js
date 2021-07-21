const {Router} = require("express")
const router = Router()

const upload = require("../middleware/Upload")
const Contact = require("../controllers/Contact")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Contact.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], upload.Contact.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Contact.Insert({...req.body, Url: req.file? req.file.path: req.body.OldImage}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], upload.Contact.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Contact.Update({...req.body, Url: req.file? req.file.path: req.body.OldImage}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Contact.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router