import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const meQuery = useQuery(ME)
  const recommendedBooksQuery = useQuery(ALL_BOOKS, {
    variables: {
      genre: meQuery.loading ? null : meQuery.data.me.favouriteGenre
    }
  })

  if (!props.show || meQuery.loading || recommendedBooksQuery.loading) return null

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre <b>{meQuery.data.me.favouriteGenre}</b></p>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recommendedBooksQuery.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommendations