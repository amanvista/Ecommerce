const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
//Handling Uncaught Exception
process.on("uncaughtException", (err)=>{
    console.log(err.message)
    console.log("Shutting Down Server due to Unhandled Promise Rejection")
    server.close(()=>{
        process.exit(1 )
    })

})
//Config
dotenv.config({path:"backend/config/config.env"})
connectDatabase()
const server = app.listen(process.env.PORT, ()=>{
console.log(`server is working on https://localhost:${process.env.PORT}`)
}) 

//Unhandled Promise Rejection - Error: Invalid connection string "mngodb://localhost:27017/Ecommerce"
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting Down Server due to Unhandled Promise Rejection")
    server.close(()=>{
        process.exit(1 )
    })
})