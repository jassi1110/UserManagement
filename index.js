const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const path = require('path')
const route = require('./server/routes/router')
const connectDB = require('./server/database/connection')

dotenv.config({path:'config.env'})
const PORT = process.env.PORT

// LOG request
app.use(morgan('tiny'))

// MongoDB Connection
connectDB()
// Parse request to Body-Parser
app.use(bodyParser.urlencoded({extended:true}))

// Set view Engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname,"views/ejs"))

// Load Assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

// Routing 
app.use('/',route)

app.listen(PORT, ()=>{
    console.log(`localhost:8000`)
})