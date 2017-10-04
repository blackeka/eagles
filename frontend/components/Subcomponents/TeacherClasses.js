import React from 'react';

const TeacherClasses = (props) => {

  return (
    <div classID='classesContainer'>
      <h3> Classes </h3>
      <select>
        {props.classList.filter(tclass => tclass.teacher === props.teachername).map((tclass, i) => (
          <option key={i}> {tclass.name} </option>
        ))}
      </select>
    </div>
  )
};

export default TeacherClasses;
