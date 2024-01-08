const connectToMongo = require("./dbconnect")
const express = require("express")
const app = express()
var cors = require('cors')
require('dotenv').config()
var port = process.env.port || 5000
connectToMongo()
app.use(cors())
app.use(express.json())
console.log("listening on port")
app.use('/auth', require('./routes/auth'))
app.use('/note', require('./routes/note'))

app.listen(port)
