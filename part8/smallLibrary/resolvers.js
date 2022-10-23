const Book = require('./schemas/book')
const Author = require('./schemas/author')
const User = require('./schemas/user')
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()


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
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }


      const authorName = args.author
      let author = await Author.findOne({ name: authorName })
      if (!author) {
        author = await Author.create({
          name: authorName,
          bookCount: 1
        })
      }
      else {
        author.bookCount = author.bookCount + 1
        await author.save()
      }

      const book = await Book.create({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })

      pubsub.publish('BOOK_ADDED', { bookAdded: await book.populate('author') })

      return book.populate('author')
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },

  // Author: {
  //   bookCount: async (root) => {
  //     return Book.countDocuments({ author: root._id })
  //   }
  // }

}

module.exports = resolvers