require('dotenv').config()
const mongoose = require('mongoose')
let mongoURI = process.env.DATABASE_URL;
async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  
  module.exports = connectToMongo;

module.exports = connectToMongo