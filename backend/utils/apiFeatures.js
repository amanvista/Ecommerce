class ApiFeatures{
    constructor (query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }
    search(){
        // console.log("Hi");
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}
        // console.log(this.queryStr, keyword)
        this.query = this.query.find({...keyword})
        return this 
    }
    filter(){
          
        const queryCopy = {...this.queryStr}
        console.log(queryCopy)
        //Remove some field for Category
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach( (key)=> delete queryCopy[key])
        console.log(queryCopy)
        // let queryStr = JSON.stringify(queryCopy)
        // queryStr = queryStr.replace(/\b( gt|gte|lt|lte)\b/g, key=>`$${key}`)
        this.query = this.query.find(queryCopy)
        return this
    }
}

module.exports = ApiFeatures