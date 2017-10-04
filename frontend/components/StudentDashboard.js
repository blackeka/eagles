import React from 'react';

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastLessons: []
    }
    //bindings
    this.handleLinkChange = this.handleLinkChange.bind(this);
  }
  //functions
  handleLinkChange(e) {
    e.preventDefault();
    console.log('Lesson link', e.target.value)
  }


  render() {
    return (
      <div classID='studentdashboard'>
        <input type='text' onChange={this.handleLinkChange} placeholder='Enter lesson link'></input>
        <div classID='pastlessons'>
          <p> Results from past lessons: </p>
        </div>
      </div>
    )
  }
};

export default StudentDashboard;
