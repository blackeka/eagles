import React from 'react';

const ApplyToClass = (props) => {

  const sendApplication = (props) => {
    // fetch('/classes', {
    //   method: "PUT",
    //   body: JSON.stringify(lessonObj),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include"
    // })
    // .then((anything) => anything.json())
    // .then((result) => {
    //   console.log('result is',result);
    //   this.setState({
    //     lessonid: result._id // setting lessonid to the lesson object's id
    //   })
    //   console.log('state now is ', this.state);
    // })
  }

    return (
      <div classID='apply'>
        <button onClick={sendApplication}> Apply to {props.classObj.name}</button>
      </div>
    )

};

export default ApplyToClass;
