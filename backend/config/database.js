const mongoose = require("mongoose")

const connectDatabase = ()=>{

mongoose.connect(process.env.DB_URI , {useNewUrlParser:true,useUnifiedTopology: true}).then((data)=>{
console.log(`Mongo DB connected ${data.connection.host}`)
})

}
const URI = process.env.MONGODB_URL;

module.exports = connectDatabase