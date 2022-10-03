import { useState } from 'react'
import {
  Routes, Route, useMatch, useNavigate
} from "react-router-dom"
import Menu from './components/Menu'
import Notification from './components/Notification'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'


const App = () => {
  const [notification, setNotification] = useState(null)
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const navigate = useNavigate()

  

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`you created ${anecdote.content}`)
    console.log(anecdote.content);
    console.log(notification);
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    navigate("/")
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === Number(id))
  
  const match = useMatch("/anecdotes/:id")
  const anecdote = match ? anecdoteById(match.params.id) : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification ? <Notification notification={notification} /> : null}
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew}/>} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App