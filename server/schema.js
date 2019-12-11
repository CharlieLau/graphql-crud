const graphql = require('graphql')
const {categories,articles} =require('./mock')


const Categroy = new graphql.GraphQLObjectType({
    name: "Categroy",
    fields() {
        return {
            id: {
                type: graphql.GraphQLInt
            },
            name: {
                type: graphql.GraphQLString
            }
        }
    }
})

const Article = new graphql.GraphQLObjectType({
    name: 'Article',
    fields: {
        id: {
            type: graphql.GraphQLInt,
        },
        name: {
            type: graphql.GraphQLString
        },
        category: {
            type: Categroy,
            resolve(parent) {
                return categories.find(item => item.id === parent.category)
            }
        }
    }
})


const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getCategory: {
            type: Categroy,
            args: {
                id: {
                    type: graphql.GraphQLInt
                }
            },
            resolve(parent, args) {
                return categories.find(item => item.id === args.id)
            }
        },
        getCategories: {
            type: new graphql.GraphQLList(Categroy),
            resolve(parent, args) {
                return categories;
            }
        },
        getArticles: {
            type: new graphql.GraphQLList(Article),
            resolve(parent,args){
                return articles
            }
        }
    }
})


const RootMutation =new graphql.GraphQLObjectType({
    name:'RootMutation',
    fields:{
        addCategory:{
            type:Categroy,
            args:{name:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            }},
            resolve(parent,args){
                args.id =categories.length+1;
                categories.push(args)
                return args
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})