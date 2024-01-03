const connectToMongo = require("./dbconnect")
const express = require("express")
const app = express()
var cors = require('cors')
connectToMongo()
app.use(cors())
app.use(express.json())
console.log("listening on port")
app.use('/auth', require('./routes/auth'))
app.use('/note', require('./routes/note'))

app.listen(5000)

// app.get("",(req,res)=>{  
//     res.send("hello how are you")
// }).listen(8080)

