const mongoose = require('mongoose')
const Author = require('./schemas/author')
const { MONGODB_URI } = require('./config')

const authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(`Failed to connect to MongoDB\n--------\n${error.message}`);
  })

// Delete documents in a collection of authors
Author.deleteMany({})
  .then(() => {
    console.log('Successfully deleted documents in "authors"');
    Author.insertMany(authors.map((a) => ({
      name: a.name,
      born: a.born,
      bookCount: 0
    })))
      .then((values) => {
        console.log('Successfully initialized "authors"');
        // console.log(values);
      })
      .catch((error) => {
        console.log(`Failed to initialize "authors"\n----\n${error.message}\n----`);
      })
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch((error) => {
    console.log(`Failed to delete documents in "authors"\n----\n${error.message}\n----`);
  })



