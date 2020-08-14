import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayAnecdote = ({header, voteCount, anecdote}) => {
  return (
    <div>
      <h1>{header}</h1>
      <p>
        {anecdote} <br/>
        has {voteCount} votes
      </p>
    </div>
  );
}

const DisplayMostPopularAnecdote = ({anecdotes, votes}) => {
  let highestVoteNumber = 0;
  let highestVotePosition = 0;
  for (let i = 0; i < votes.length; i += 1) {
    if (votes[i] > highestVoteNumber) {
      highestVoteNumber = votes[i];
      highestVotePosition = i;
    }
  };

  if (highestVoteNumber === 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>All anecdotes have 0 votes</p>
      </div>
    )
  } else {
    return (
      < DisplayAnecdote header='Anecdote with most votes' 
                       voteCount={highestVoteNumber} 
                       anecdote={anecdotes[highestVotePosition]}
      />
    )
  }

}

const Button = ({text, handleClick}) => {
  return (<button onClick={handleClick}>{text}</button>);
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length + 1)
                                .join('0').split('').map(Number));

  const randomiseSelected = () => {
    let randomNumber = selected;

    while (randomNumber === selected) {
      randomNumber = Math.floor(Math.random() * anecdotes.length);
    }

    setSelected(randomNumber);
  }

  const castAnecdoteVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <div>
      <DisplayAnecdote header="Anecdote of the day" anecdote={anecdotes[selected]} voteCount={votes[selected]}/>
      <Button handleClick={castAnecdoteVote} text='vote'/>
      <Button handleClick={randomiseSelected} text='next anecdote'/>
      <DisplayMostPopularAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)