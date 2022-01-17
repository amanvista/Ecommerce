const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncError")
const User = require("../models/userModel")
const sendToken = require("../utils/jwtToken")
// Register a User
exports.registerUser =  catchAsyncErrors( async (req, res, next)=>{
    const {name, email, password} = req.body
    const user = await User.create({
        name, email, password, avatar:{
            public_id:"this is sample id",
            url: "profile pic url"
        }
    })
    
    sendToken(user, 201, res)
})

// Login User
exports.loginUser = catchAsyncErrors (
    async (req,res, next)=>{
        const {email, password} = req.body
        if(!email || !password){
            return next(new ErrorHandler("Please enter Email & Password",400))
        }
        const user = await User.findOne({email}).select("+password")

        if(!user){ 
            return next(new ErrorHandler("Invalid email or password", 401))
        }
        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password", 401))
        }
        sendToken(user, 200, res)

    }
)