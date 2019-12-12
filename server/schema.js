const graphql = require('graphql')
// const {
//     categories,
//     articles
// } = require('./mock')
const {
    CategoryModel,
    ArticleModel
} = require('./mongo')
const Categroy = new graphql.GraphQLObjectType({
    name: "Categroy",
    fields() {
        return {
            id: {
                type: graphql.GraphQLString
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
            type: graphql.GraphQLString,
        },
        name: {
            type: graphql.GraphQLString
        },
        content:{
            type: graphql.GraphQLString
        },
        category: {
            type: Categroy,
            resolve(parent) {
                return CategoryModel.findById (parent.category)
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
                    type: graphql.GraphQLString
                }
            },
            resolve(parent, args) {
                return CategoryModel.findById(args.id)
            }
        },
        getCategories: {
            type: new graphql.GraphQLList(Categroy),
            resolve(parent, args) {
                return CategoryModel.find()
                // return categories;
            }
        },
        getArticles: {
            type: new graphql.GraphQLList(Article),
            resolve(parent, args) {
                return ArticleModel.find();
            }
        },
    }
})


const RootMutation = new graphql.GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addCategory: {
            type: Categroy,
            args: {
                name: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve(parent, args) {
                return CategoryModel.insertMany({
                    name: args.name
                })
            }
        },
        editCategory: {
            type: Categroy,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                },
                name: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                }
            },
            resolve(parent, args) {
                return CategoryModel.findByIdAndUpdate(args.id, {
                    name: args.name
                }, (err, res) => {
                    if (err) {
                        throw err
                    }
                })
            }
        },
        deleteCategory: {
            type: Categroy,
            args: {
                id: {
                    type:new graphql.GraphQLNonNull(graphql.GraphQLString),
                }
            },
            resolve(parent, args) {
                return CategoryModel.findByIdAndRemove(args.id)
            }
        },
        addArticle:{
            type:Article,
            args:{
                name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                category: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                content: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
            },
            resolve(parent,args){
                return  ArticleModel.create(args)
            }
        },
        editArticle:{
            type:Article,
            args:{
                id: {
                    type:new graphql.GraphQLNonNull(graphql.GraphQLString),
                },
                name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                category: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                content: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
            },
            resolve(parent,args){
                return ArticleModel.findByIdAndUpdate(args.id, {
                    name: args.name,
                    category: args.category,
                    content:args.content
                }, (err, res) => {
                    if (err) {
                        throw err
                    }
                })
            }
        },
        deleteArticle:{
            type: Article,
            args: {
                id: {
                    type:new graphql.GraphQLNonNull(graphql.GraphQLString),
                }
            },
            resolve(parent, args) {
                return ArticleModel.findByIdAndRemove(args.id)
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})