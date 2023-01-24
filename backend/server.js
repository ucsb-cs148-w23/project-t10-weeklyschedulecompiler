require('dotenv').config()

const express = require('express')

const app = express();
app.use(express.json())

app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })

//write a funciont that calculates distance between 2 points
//https://www.geodatasource.com/developers/javascript

