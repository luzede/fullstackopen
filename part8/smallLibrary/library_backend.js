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
      const { author, genre } = args
      console.log(genre);
      return Book.find({
        // author: author._id,
        // genres: {
        //   $all: [genre]
        // }
      }).populate('author')
    },
    allAuthors: () => {
      return authors
    }
  },

  Mutation: {
    addBook: (root, args) => {
      const book = {
        ...args,
        id: uuid()
      }
      books = books.concat(book)

      if (authors.find(a => a.name === book.author)) return book
      else {
        authors = authors.concat({
          name: book.author,
          id: uuid()
        })

        return book
      }
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) return null
      authors = authors.map(a => a.name === author.name ? { ...author, born: args.born } : a)
      return {
        ...author,
        born: args.born
      }
    }
  },

  Author: {
    bookCount: () => {
      return books.length
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