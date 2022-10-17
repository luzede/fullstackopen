const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./schemas/book')
const Author = require('./schemas/author')
const { MONGODB_URI } = require('./config')

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
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book!
    editAuthor(name: String!, born: Int!): Author
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
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      const authorName = args.author
      let author = await Author.findOne({name: authorName})
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
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})