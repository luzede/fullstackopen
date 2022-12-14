import { useState } from 'react'



const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const randomIndex = (array) => {
        let RI = Math.floor(Math.random() * array.length)
        while(RI === selected) {
            RI = Math.floor(Math.random() * array.length);
        }
        return RI
    }

    const highestIndex = (array) => {
        let highest = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[highest]) {
                highest = i;
            }
        }
        return highest
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button onClick={() => setVotes(votes.slice(0, selected).concat(votes[selected] + 1).concat(votes.slice(selected + 1)))}>Vote</button>
            <button onClick={() => setSelected(randomIndex(anecdotes))}>Next anecdote</button>

            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[highestIndex(votes)]}</p>
            <p>has {votes[highestIndex(votes)]} votes </p>
            
        </div>
    )
}

export default App