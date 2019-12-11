const express = require('express')
const graphqlHTTP = require('express-graphql');
const cors = require('cors')
const schema = require('./schema')

const app = express()

app.use(cors({
    origin:'http://localhost:9007',
    methods:'GET,PUT,POST,OPTIONS'
}))
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
})) 
 

app.get('/',(req,res)=>{
    res.send('hello world ~');
})

app.listen(9006,()=>{
    console.log('Server Listening  at  9006....');
})