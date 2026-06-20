import React from 'react'

const SingleModule = ({ title, taskCount }) => (
  <p>
    {title} {taskCount}
  </p>
)

const CourseContent = ({ parts }) => (
  <div>
    {parts.map(part => (
      <SingleModule
        key={part.id}
        title={part.name}
        taskCount={part.exercises}
      />
    ))}
  </div>
)

const TotalSummary = ({ parts }) => {
  const accumulatedSum = parts.reduce((acc, current) => acc + current.exercises, 0)

  return (
    <p><strong>total of {accumulatedSum} exercises</strong></p>
  )
}

const Course = ({ courseData }) => (
  <div>
    <h2>{courseData.name}</h2>
    <CourseContent parts={courseData.parts} />
    <TotalSummary parts={courseData.parts} />
  </div>
)

export default Course