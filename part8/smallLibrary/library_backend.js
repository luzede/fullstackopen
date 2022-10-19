const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./schemas/book')
const Author = require('./schemas/author')
const User = require('./schemas/user')
const { MONGODB_URI, JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(`Failed to connect:\n${error.message}`);
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book!

    editAuthor(name: String!, born: Int!): Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type User {
  username: String!
  favouriteGenre: String!
  id: ID!
  }

  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      return Book.countDocuments()
    },
    authorCount: async () => {
      return Author.countDocuments()
    },
    allBooks: async (root, args) => {
      const authorName = args.author
      const genre = args.genre
      const author = await Author.findOne({
        name: authorName
      })

      if (author && genre) {
        return Book.find({
          author: author._id,
          genres: {
            $all: [genre]
          }
        }).populate('author')
      }
      else if (author) {
        return Book.find({
          author: author._id
        }).populate('author')
      }
      else if (genre) {
        return Book.find({
          genres: {
            $all: [genre]
          }
        }).populate('author')
      }
      else {
        return Book.find({}).populate('author')
      }

    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      const authorName = args.author
      let author = await Author.findOne({ name: authorName })
      if (!author) {
        author = await Author.create({
          name: authorName
        })
      }

      const book = await Book.create({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })

      return book.populate('author')
    },
    editAuthor: async (root, args) => {
      const authorName = args.name
      const born = args.born
      const author = await Author.findOne({ name: authorName })
      if (!author) return null
      else {
        author.born = born
        return author.save()
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre
      })

      return user.save()
        .catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password != 'elly') {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },

  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root._id })
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})