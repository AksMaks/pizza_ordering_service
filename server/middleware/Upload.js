const multer = require("multer")
const moment = require("moment")

const storage = (path) => multer.diskStorage({
  destination(req, file, cd){
    cd(null, `uploads/${path}`)
  },
  filename(req, file, cd){
    const date = moment().format("DDMMYYYY-HHmmss_SSS") 
    cd(null, date + "-" + file.originalname)
  }
})

const fileFilter = (req, file, cd) =>{
  if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"){
    cd(null, true)
  }else{
    cd(null, false)
  }
}
const limits = {
  fileSize: 1024*1024*5
}

module.exports = {
  Additive: multer({
    storage: storage("Additive/"),
    fileFilter: fileFilter,
    limits: limits
  }),
  Comment: multer({
    storage: storage("Comment/"),
    fileFilter: fileFilter,
    limits: limits
  }),
  Contact: multer({
    storage: storage("Contact/"),
    fileFilter: fileFilter,
    limits: limits
  }),
  Cooperation: multer({
    storage: storage("Cooperation/"),
    fileFilter: fileFilter,
    limits: limits
  }),
  Stock: multer({
    storage: storage("Stock/"),
    fileFilter: fileFilter,
    limits: limits
  })
}