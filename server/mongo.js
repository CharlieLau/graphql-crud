const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/graph-demo',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

conn.on('open', () => {
    console.log('数据库已连接..')
})
conn.on('error', error => {
    console.log(error)
})


const Category = new mongoose.Schema({
    name:String
})
const CategoryModel = conn.model('Category',Category)

const Article= new mongoose.Schema({
    name:String,
    content:String,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
})

const ArticleModel = conn.model('Article', Article)


module.exports ={
    CategoryModel,
    ArticleModel
}