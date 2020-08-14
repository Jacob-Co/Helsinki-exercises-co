import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({goodCount, neutralCount, badCount}) => {
  let total = goodCount + neutralCount + badCount;
  let average = ((goodCount - badCount) / total).toFixed(2);
  let positive = ((goodCount / total) * 100).toFixed(2) + ' %';

  if (total === 0) return (<div>No feedback given</div>)

  return (
    <table>
      <tbody>
      <Statistic text="good" value={goodCount} />
      <Statistic text="neutral" value={neutralCount} />
      <Statistic text="bad" value={badCount} />
      <Statistic text="total" value={total} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addOneGood = () => setGood(good + 1);
  const addOneNeutral = () => setNeutral(neutral + 1);
  const addOneBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={addOneGood} />
      <Button text="neutral" handleClick={addOneNeutral} />
      <Button text="bad" handleClick={addOneBad} />
      <h1>statistics</h1>
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)