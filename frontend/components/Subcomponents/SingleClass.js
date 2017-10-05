import React from 'react';

const SingleClass = (props) => {

  return (
    <div className='classContainer'>
      <h3> Class name: "{props.selectedClass.name}" </h3>
      <p> Lessons: {props.selectedClass.lessons} </p>
      <p> Students: </p>
      <div classID='studentsenrolled'>
        <ol>
        {props.selectedClass.students ? props.selectedClass.students.map((student, i) => (
          <div key={i}>
            <li> {student.username} </li>
          </div>
        )) : ''}
        </ol>
      </div>
    </div>
  )
}

export default SingleClass;
