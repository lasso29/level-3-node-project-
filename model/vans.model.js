const mongoose = require("mongoose")


let vanSchema=mongoose.Schema({
    firstName:{type:String, required:true},
    email:{type:String, required: true, unique:true},
    phoneCode:{type:String, required: true},
    gender:{type:String, required: true,},
    password:{type:String, required: true}
})


let vanModel = mongoose.model("vansDatabase", vanSchema)
module.exports = vanModel