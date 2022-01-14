const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncError")
const ApiFeatures = require("../utils/apiFeatures")



//create Product - Admin route
exports.createProduct = catchAsyncErrors(
async ( req, res, next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})  
// Get all Products
exports.getAllProducts= catchAsyncErrors(
    async (req,res)=>{
    const resultPerPage = 5
    const productCount = await Product.countDocuments()
    results = Product.find()
    const apiFeature = new ApiFeatures(results, req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query
    res.status(200).json({
        success: true,products, productCount
    })
}) 
// Update Product - Admin
exports.updateProduct = catchAsyncErrors(
    async (req, res, next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,  
        {new: true, runValidators: true, useFindModify: false})

    res.status(200).json({
        success: true,
        product
    })
        
})

// delete product
exports.deleteProduct = catchAsyncErrors(
    async (req, res, next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    }
    await product.remove()
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
})

exports.getProductDetails = catchAsyncErrors(
    async (req, res, next)=>{
    
    let product = await Product.findById(req.params.id)
    if(!product){
        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found"
        // })
        // next is callback function
        return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
}) 