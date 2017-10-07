import React from 'react';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';

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
      <Modal show={props.showApp} onHide={props.hideApplicationCb}>
        <Modal.Body>
        <h4> Why do you want to join this class? What do you hope to gain from it?</h4>
        <textarea rows="6" cols="50" onChange={handleTextChange}></textarea><br></br>
        <Button className='appsubmit' onClick={sendApplication}> Apply to {props.classObj.name}</Button>
        <Button className='cancel' onClick={props.hideApplicationCb}> Cancel</Button>
        </Modal.Body>
      </Modal>
    </div>
    )

};

export default ApplyToClass;
