import React from 'react';

const SingleClass = (props) => {

  return (
    <div className='classContainer'>
      <h3> Class name: `"${props.selectedClass.name}"` </h3>
      <p> Lessons: {props.selectedClass.lessons} </p>
      <p> Students: {props.selectedClass.studentList} </p>
    </div>
  )
}

export default SingleClass;
