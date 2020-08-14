import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};

const Part = (props) => {
  return (
  <>
  <p>{props.part} {props.exercise}</p>
  </>
  );
};

const Content = (props) => {
  let partNames = props.parts.map(part => part.name);
  let partExercises = props.parts.map(part => part.exercises);
  return (
    <div>
      <Part part={partNames[0]} exercise={partExercises[0]}/>
      <Part part={partNames[1]} exercise={partExercises[1]}/>
      <Part part={partNames[2]} exercise={partExercises[2]}/>
    </div>
  );
};

const Total = (props) => {
  let totalNumExercises = props.parts.reduce((total, part) => total += part.exercises, 0);
  return (
    <div>
    <p>Number of exercises {totalNumExercises}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
