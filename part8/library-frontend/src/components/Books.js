import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const { loading, data, refetch } = useQuery(ALL_BOOKS)
  const allBooksQuery = useQuery(ALL_BOOKS)


  const onClick = (genre) => {
    return () => {
      refetch({ genre })
    }
  }


  if (!props.show) {
    return null
  }

  if (loading || allBooksQuery.loading) return null

  const genres = [...new Set(
    allBooksQuery.data.allBooks.reduce(
      (a, b) => {
        return a.concat(b.genres)
      }, [])
  )]


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <div>
        {genres.map((g) => {
          return <button key={g} onClick={onClick(g)}>{g}</button>
        })}
        <button key={"all genres"} onClick={onClick()}>all genres</button>
      </div>
    </div>
  )
}

export default Books
