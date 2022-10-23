const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const User = require('./schemas/user')
const { MONGODB_URI, JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const { makeExecutableSchema } = require('@graphql-tools/schema')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(`Failed to connect:\n${error.message}`);
  })



const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ]
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/'
  })

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server is now running at http://localhost:${PORT}`);
  })
}

start()