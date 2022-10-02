
import { useField } from "../hooks/index.js"

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} reset='' />
        </div>
        <div>
          author
          <input name='author' {...author} reset='' />
        </div>
        <div>
          url for more info
          <input name='info' {...info} reset='' />
        </div>
        <button type='submit'>create</button>
        <button onClick={handleReset} type='button'>reset</button>
      </form>
    </div>
  )
}

export default CreateNew