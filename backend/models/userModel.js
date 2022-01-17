const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 10)
    if(!this.isModified("password")){
        next()
    }
})

// JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    } )
}

//compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
module.exports = mongoose.model("User", userSchema)