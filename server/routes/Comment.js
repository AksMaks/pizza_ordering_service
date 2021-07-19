const {Router} = require("express")
const router = Router()

const upload = require("../middleware/Upload")
const Comment = require("../controllers/Comment")
const ErrorHandler = require("../utils/ErrorHandler")

router.get('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Comment.Get(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.post('/', [], upload.Comment.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Comment.Insert({...req.body, Url: req.file.path}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.patch('/', [], upload.Comment.single('Image'), (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Comment.Update({...req.body, Url: req.file.path}))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

router.delete('/', [], (req, res) => {
  try{
    (async () => {
      res.status(200).json(await Comment.Delete(req.body))
    })()
  }catch(e){
    ErrorHandler(res, e)
  }
})

module.exports = router