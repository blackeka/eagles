import React from 'react';
import $ from 'jquery';

class TeacherApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: [],
      selectedApp: {},
    }
    this.approveStudent = this.approveStudent.bind(this);
  }

  componentDidMount() {
    return fetch('/applications', { method: 'GET', credentials: "include" })
    .then( (res) => res.json())
    .then((JSONresponse) => {
      var relevantApps = JSONresponse.filter((app) => app.teacher === this.props.teachername && app.status === false);
      this.setState({
        appList: relevantApps
      })
    })
  };

  approveStudent(e) {

      var desired = $(e.target).parent().children();
      let student = desired[0].innerText.slice(14);
      let klass = desired[1].innerText.slice(7);
      let approveObj = {
        student: student,
        class: klass
      }

      return fetch('/applications', {
        method: "PUT",
        body: JSON.stringify(approveObj),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
      .then( () => {
        return fetch('/classes', {
          method: "PUT",
          body: JSON.stringify(approveObj),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        })
        .then( () => {
          var editedAppList = this.state.appList.filter((app) => app.student !== student);
          this.setState({
            appList: editedAppList
          })
        })
      })

  };

  render() {
    return (
      <div classID='appContainer'>

        {this.state.appList.length > 0 ? this.state.appList.map((app, i) => (
          <div className='singleApp' key={i} style={appStyle}>
            <p> Student name: {app.student} </p>
            <p> Class: {app.class} </p>
            <p> Application: {app.reason} </p>
            <button onClick={this.approveStudent}> Approve </button>
          </div>
        )) : ''}

      </div>
    )
  }
};

const appStyle = {
  border: "solid black 1px",
  borderRadius: "10px",
  textAlign: "center",
  width: "50%",
  margin: "auto"
}

export default TeacherApplications;
