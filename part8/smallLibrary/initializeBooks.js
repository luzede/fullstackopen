const mongoose = require('mongoose')
const Author = require('./schemas/author')
const Book = require('./schemas/book')
const { MONGODB_URI } = require('./config')

const books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(`Failed to connect to MongoDB\n--------\n${error.message}`);
  });

(async function () {
  await Book.deleteMany({})
  console.log('Successfully delete documents in "books"');
  
  const booksWithAuthorId = await Promise.all(books.map(async (b) => {
    const author = await Author.findOne({ name: b.author })
    if (!author) return null
    author.bookCount = author.bookCount + 1
    await author.save()
    return {
      title: b.title,
      author: mongoose.Types.ObjectId(author._id.toString()),
      published: b.published,
      genres: b.genres
    }
  }))

  // console.log(booksWithAuthorId);

  await Book.insertMany(booksWithAuthorId)
  console.log('Successfully initialized "books"');

  await mongoose.connection.close()
})();