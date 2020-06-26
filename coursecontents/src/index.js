import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) =>
{
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) =>
{
  const total = parts.reduce((x,y) => x + y.exercises, 0)

  return (
    <>
      <b>total of {total} exercises</b>
    </>
  ) 
}

const Part = ({ name, exercises }) =>
{
  return (
    <>
      {name} {exercises}
    </>
  )
}

const Content = ({ parts }) =>
{
  return (
    <>
      {parts.map(part =>
        <p key={part.id}>
          <Part name={part.name} exercises={part.exercises} />
        </p>
      )}
    </>
  )
}

const Course = ({ course }) =>
{
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} /> 
    </div>
  )
}

const App = () =>
{
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))