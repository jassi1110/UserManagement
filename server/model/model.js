const mongoose = require('mongoose')

// Document Shape
var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    status:String
    
})
                                // Document Name
const Userdb = mongoose.model('userdb',schema)

module.exports = Userdb