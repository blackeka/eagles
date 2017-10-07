import React from 'react';
import axios from 'axios';
import TeacherClasses from './Subcomponents/TeacherClasses';
import CreateClass from './Subcomponents/CreateClass';
import SingleClass from './Subcomponents/SingleClass';
import { Button} from 'react-bootstrap';

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [{name: 'placeholder'}],
      classListWithStudents: [],
      studentList: [],
      lessonList: [],
      showCreateClassForm: false,
      selectedClassName: '',
      selectedClassObj: {}
    }
    //bindings
    this.createNewClass = this.createNewClass.bind(this);
    this.selectClass = this.selectClass.bind(this);
  }
  //functions

  componentDidMount() {
    return fetch('/classes', { method: 'GET', credentials: "include" })
    .then( (res) => res.json())
    .then((JSONresponse) => {
      console.log('response from classes endpoint', JSONresponse)
      var teachersClasses = JSONresponse.filter((clas) => clas.teacher === this.props.username)
      this.setState({
        classList: teachersClasses
      }, () => console.log('state after mount', this.state))
    })
    .then( () => {
      this.state.classList.forEach((klass) => {
        return fetch('/users', { method: 'GET', credentials: "include"})
        .then( (response) => response.json())
        .then( (allUsers) => {
          var studentList = allUsers.filter((user) => user.classes.includes(klass._id) || user.classes.includes(klass.name));
          // console.log('student list for class', studentList)
          klass['students'] = studentList;
          var newClassListWithStudents = this.state.classListWithStudents;
          newClassListWithStudents.push(klass);
          this.setState({
            classListWithStudents: newClassListWithStudents
          })
        })
      })
    })
  }

  createNewClass(classObj) {
    axios.post('/classes', classObj)
    .then( () => {
      return fetch('/classes', { method: 'GET', credentials: "include" })
      .then( (res) => res.json())
      .then((JSONresponse) => {
        console.log('response from classes endpoint', JSONresponse)
        var teachersClasses = JSONresponse.filter((clas) => clas.teacher === this.props.username)
        this.setState({
          classList: teachersClasses,
          showCreateClassForm: false,
        }, () => {
        this.state.classList.forEach((klass) => {
          return fetch('/users', { method: 'GET', credentials: "include"})
          .then( (response) => response.json())
          .then( (allUsers) => {
            var studentList = allUsers.filter((user) => user.classes.includes(klass._id) || user.classes.includes(klass.name));
            klass['students'] = studentList;
            var newClassListWithStudents = this.state.classListWithStudents;
            newClassListWithStudents.push(klass);
            this.setState({
              classListWithStudents: newClassListWithStudents,
              selectedClassObj: newClassListWithStudents[0]
            })
          })
        })})
      })
    })
    .then( () => this.selectClass(classObj.name))
  };

  selectClass(selClass) {
    var selClassObj = this.state.classListWithStudents.filter((klass) => klass.name === selClass)[0];
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
  }


  render() {
    return (
      <div classID='teacherDashboardContainer'>
        <h3> Welcome back, {this.props.username}!</h3>
        <div classID='teacherClasses'>
          <TeacherClasses classList={this.state.classList} teachername={this.props.username} selectedClass={this.state.selectedClassName} classSelectCb={this.selectClass} /><br></br>
          <Button onClick={() => this.setState({ showCreateClassForm: true})}> Create new class </Button><br></br>
          {this.state.showCreateClassForm ? <CreateClass teachername={this.props.username} createNewClass={this.createNewClass} allLessons={this.props.allLessons}/> : ''}
          <hr></hr>
          <SingleClass selectedClass={this.state.selectedClassObj} role={this.props.role}/>
        </div>
        <br/><br/><br/><br/><br/>
      </div>
    )
  }
};

export default TeacherDashboard;
