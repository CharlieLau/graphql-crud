
## GraphQL-CRUD
* client  
* server  

## server

``` shell
    yarn add express express-graphql graphql cors
```

``` javascript
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


```



##  client

* vue cli
* [Vue Apollo](https://apollo.vuejs.org/guide/installation.html)

``` shell
    vue create client

    # apolloProvider 

    yarn add vue-apollo graphql apollo-client apollo-link apollo-link-http apollo-cache-inmemory graphql-tag

```

element.js
``` javascript
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

```
apollo.js
``` javascript
import Vue from "vue";
import VueApollo from "vue-apollo";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use(VueApollo);

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:9006/graphql",
  credentials: "omit"
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

```
main.js
``` javascript
import Vue from "vue";
import App from "./App.vue";
import { apolloProvider } from "./plugins/apollo";
import "./plugins/element";

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  render: h => h(App)
}).$mount("#app");

```
