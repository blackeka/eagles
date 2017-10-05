import React from 'react';
import $ from 'jquery';

const ApplyToClass = (props) => {

  const handleTextChange = (e) => {
    props.applicationTextCb(e.target.value)
  }

  const sendApplication = () => {
    props.hideApplicationCb()
    var application = {
      class: props.classObj.name,
      teacher: props.classObj.teacher,
      student: props.studentname,
      reason: props.appText,
      status: false
    }
    return fetch('/applications', {
      method: "POST",
      body: JSON.stringify(application),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
  }

    return (
      <div className='apply'>
        <h4> Why do you want to join this class? What do you hope to gain from it?</h4>
        <textarea onChange={handleTextChange}></textarea><br></br>
        <button className='appsubmit' onClick={sendApplication}> Apply to {props.classObj.name}</button>
      </div>
    )

};

export default ApplyToClass;
