import React from 'react';
import StudentClasses from './Subcomponents/StudentClasses';
import SingleClass from './Subcomponents/SingleClass';

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      selectedClassName: '',
      selectedClassObj: {},
      pendingApplications: []
    }
    //bindings
    this.selectClass = this.selectClass.bind(this);
    this.getPendingApplications = this.getPendingApplications.bind(this);
  }
  //functions
  componentDidMount() {
    var studentClasses = [];
    fetch(`/users/${this.props.studentId}`, { method: 'GET', credentials: "include" })
    .then( (res) => res.json())
    .then( (studentObj) => {
      studentClasses = studentObj[0].classes.slice();
    })
    .then( () => {
       fetch('/classes', { method: 'GET', credentials: "include" })
      .then( (res) => res.json())
      .then((JSONresponse) => {
        var studentClassList = JSONresponse.filter((clas) => studentClasses.includes(clas.name) || studentClasses.includes(clas._id))
        this.setState({
          classList: studentClassList
        }, () => {
          this.selectClass(this.state.selectedClassName);
          this.getPendingApplications();
        })
      })
    })
  };

  selectClass(selClass) {
    var selClassObj = this.state.classList.filter((klass) => klass.name === selClass)[0];
    //want to replace the lesson string in this object with the lesson object itself
    console.log('selected class object before anything', selClassObj)
    var selClassLessonName = selClassObj.lessons;
    fetch('/lessons', { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include" })
    .then( (res) => res.json())
    .then((allLessons) => {
      var desiredLessonObj = allLessons.filter((lesson) => lesson.name === selClassLessonName)[0];
      selClassObj.lessons = desiredLessonObj;
      this.setState({
        selectedClassName: selClass,
        selectedClassObj: selClassObj
      }, () => console.log('selected class', this.state.selectedClassObj))
    })
  };

  getPendingApplications() {
    fetch('/applications', { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include" })
    .then((res) => res.json())
    .then((allApplications) => {
      var studentsApps = allApplications.filter((app) => (app.student === this.props.studentname && app.status === false) );
      this.setState({
        pendingApplications: studentsApps
      },() => console.log('applications', this.state.pendingApplications))
    })
  }

  render() {
    return (
      <div classID='studentdashboard'>
        <h3> Welcome back, {this.props.studentname}!</h3>
        <StudentClasses classList={this.state.classList} studentname={this.props.username} selectedClass={this.state.selectedClassName} classSelectCb={this.selectClass} /><br></br>
        <SingleClass selectedClass={this.state.selectedClassObj} role={this.props.role}/><br></br>
        <hr></hr>
        <h3> Pending Applications: </h3>
        <ol>
        {this.state.pendingApplications.map((app, i) => (
          <li key={i}> '{app.class}' taught by {app.teacher}</li>
        ))}
        </ol>
        <br/><br/><br/><br/>
      </div>
    )
  }
};

export default StudentDashboard;
