import React from 'react';

const ApplyToClass = (props) => {

  const sendApplication = () => {
    var application = {
      classID: props.classObj._id,
      userID: props.userID
    }
    return fetch('/classes', {
      method: "PUT",
      body: JSON.stringify(application),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((anything) => console.log('application sent successfully!'));
  }

    return (
      <div classID='apply'>
        <button onClick={sendApplication}> Apply to {props.classObj.name}</button>
      </div>
    )

};

export default ApplyToClass;
