const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const feedRotes = require('./routes/feed')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET , POST , PUTH , PATCH , DELETE')
    res.setHeader('Access-control-Allow-Headers', 'Content-type, Authorization')
    next()
})

app.use('/feed', feedRotes)
app.use((error, req , res , next) => {
    console.log(error) 
    const status = error.statusCode || 500
    const message = error.message 
    res.status(status).json({message: message})

})
mongoose.connect(process.env.MONGODB_URI).then(result => {
    app.listen(8080)
}).catch(err => console.log(err))   