const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = mongoose.Schema({
     name:{
         type:String,
         require: [true, "Please enter your Name"],
         maxLength: [30, "Name cannot exceed 30 characters"],
         minLength: [4, "Name should be more than 4 characters"]
     },
     email:{
         type: String,
         required: [ true, "Please enter your Email"],
         unique: true,
         validate: [validator.isEmail, "Please enter valid Email"]
     },
     password:{
         type: String,
         required: [ true, "Please enter your Password"],
         minLength: [8, "Password should be more than 4 characters"],
         // after calling find method password should not be displayed
         select: false,


     },
     avatar:
     { public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
      
     },
     role:{
         type: String,
         default: "user"
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date,
})

module.exports = mongoose.model("User", userSchema)