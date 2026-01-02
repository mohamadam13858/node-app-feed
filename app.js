const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const feedRotes = require('./routes/feed')
const mongoose = require('mongoose')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin' , '*')
    res.setHeader('Access-Control-Allow-Methods' , 'GET , POST , PUTH , PATCH , DELETE')
    res.setHeader('Access-control-Allow-Headers'  , 'Content-type, Authorization')
    next()
})

app.use('/feed', feedRotes)
mongoose.connect(process.env.MONGODB_URI).then(result => {
    app.listen(8080)
}).catch(err => console.log(err))