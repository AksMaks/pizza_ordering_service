const express = require("express")
const config = require("config")
const app = new express()

const PORT = config.get("port") || 5000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/Additive', require('./routes/Additive'))
app.use('/api/Branch', require('./routes/Branch'))
app.use('/api/Category', require('./routes/Category'))
app.use('/api/User', require('./routes/User'))
app.use('/api/Comment', require('./routes/Comment'))
app.use('/api/Contact', require('./routes/Contact'))
app.use('/api/Cooperation', require('./routes/Cooperation'))
app.use('/api/Level', require('./routes/Level'))
app.use('/api/Stock', require('./routes/Stock'))
app.use('/api/Product', require('./routes/Product'))
//product, product-option, list-additive (crud) 
//order (create read)

async function start() {
  try{
    app.listen(PORT, () => console.log(`Starn in port ${PORT}`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()