import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, SET_AUTHORS_BIRTH } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const allAuthorsQuery = useQuery(ALL_AUTHORS)
  const [setAuthorsBirthMutation] = useMutation(SET_AUTHORS_BIRTH, {
    onError: (error) => {
      console.log(error);
      console.log(error);
    },
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const submit = (event) => {
    event.preventDefault()

    setAuthorsBirthMutation({
      variables: {
        name: name,
        born: parseInt(year)
      }
    })
  }

  if (!props.show) {
    return null
  }
  
  if (allAuthorsQuery.loading) return null

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {allAuthorsQuery.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2><b>set birthyear</b></h2>
        <div>
          <form onSubmit={submit} id="editAuthorBirthForm">
            <div>
              <Select
                onChange={(selected) => setName(selected.value)}
                defaultValue={name}
                options={allAuthorsQuery.data.allAuthors.map(a => ({ value: a.name, label: a.name }))}
              />
            </div>
            <div>
              born: <input type='number' name='year' value={year} onChange={(e) => setYear(e.target.value)} required/>
            </div>
            <div>
              <button type='submit'>update author</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authors
