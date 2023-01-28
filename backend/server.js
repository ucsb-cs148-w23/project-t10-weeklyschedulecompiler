require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express() //initialize express app

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome'})
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connecting to db & listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })

