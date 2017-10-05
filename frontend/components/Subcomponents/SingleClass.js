import React from 'react';

const SingleClass = (props) => {

  return (
    <div className='classContainer'>
      <h3> Class name: "{props.selectedClass.name}" </h3>
      <p> Lessons: {props.selectedClass.lessons} </p>
      <p> Students: </p>
      <div classID='studentsenrolled'>
        {props.selectedClass.students ? props.selectedClass.students.forEach((student) => (
          <div>
            <p> text from yes part of for each </p>
            <p> {student.username} </p>
          </div>
        )) : ''}
      </div>
    </div>
  )
}

export default SingleClass;
