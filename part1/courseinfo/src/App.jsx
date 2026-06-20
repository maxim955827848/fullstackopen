import React from 'react'

const Header = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Part = ({ title, count }) => {
  return (
    <p>
      {title} {count}
    </p>
  )
}

const Content = ({ modules }) => {
  return (
    <div>
      <Part title={modules[0].name} count={modules[0].exercises} />
      <Part title={modules[1].name} count={modules[1].exercises} />
      <Part title={modules[2].name} count={modules[2].exercises} />
    </div>
  )
}

const Total = ({ modules }) => {
  const sumOfExercises = modules[0].exercises + modules[1].exercises + modules[2].exercises
  
  return (
    <p><strong>Number of exercises {sumOfExercises}</strong></p>
  )
}

const App = () => {
  const courseDetails = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }

  return (
    <div>
      <Header courseName={courseDetails.name} />
      <Content modules={courseDetails.parts} />
      <Total modules={courseDetails.parts} />
    </div>
  )
}

export default App