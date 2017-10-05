import React from 'react';

const StudentClasses = (props) => {

  const handleClassChange = (e) => {
    props.classSelectCb(e.target.value)
  }

  return (
    <div classID='classesContainer'>
      <h3> Classes </h3>
      <select value={props.selectedClass} onChange={handleClassChange}>
        <option> - Select your class - </option>
        {props.classList.map((tclass, i) => (
          <option key={i}> {tclass.name} </option>
        ))}
      </select>
    </div>
  )
};

export default StudentClasses;
