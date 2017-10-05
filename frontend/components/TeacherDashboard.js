import React from 'react';
import axios from 'axios';
import TeacherClasses from './Subcomponents/TeacherClasses';
import CreateClass from './Subcomponents/CreateClass';
import SingleClass from './Subcomponents/SingleClass';

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
        classList: teachersClasses,
        selectedClassName: teachersClasses[0].name
      }, () => console.log('state after mount', this.state))
    })
    .then( () => {
      this.state.classList.forEach((klass) => {
        return fetch('/users', { method: 'GET', credentials: "include"})
        .then( (response) => response.json())
        .then( (allUsers) => {
          var studentList = allUsers.filter((user) => user.classes.includes(klass._id) || user.classes.includes(klass.name));
          console.log('student list for class', studentList)
          klass['students'] = studentList;
          var newClassListWithStudents = this.state.classListWithStudents;
          newClassListWithStudents.push(klass);
          this.setState({
            classListWithStudents: newClassListWithStudents,
            selectedClassObj: newClassListWithStudents[0]
          })
        })
      })
    })
  }

  createNewClass(classObj) {
    //axios post call
    axios.post('/classes', {
      name: classObj.name,
      teacher: this.props.username,
      lessons: []
    })
    .then( () => {
      return fetch('/classes', { method: 'GET', credentials: "include" })
      .then( (res) => res.json())
      .then((JSONresponse) => {
        console.log('response from classes endpoint', JSONresponse)
        this.setState({
          classList: JSONresponse,
          showCreateClassForm: false
        })
      })
    })
  };

  selectClass(selClass) {

    var selClassObj = this.state.classListWithStudents.filter((klass) => klass.name === selClass)[0];
      this.setState({
        selectedClassName: selClass,
        selectedClassObj: selClassObj
      }, () => console.log('selected class', this.state.selectedClassObj))
  }


  render() {
    return (
      <div classID='teacherDashboardContainer'>
        <h1> Welcome back, {this.props.username}!</h1><br></br>
        <div classID='teacherClasses'>
          <TeacherClasses classList={this.state.classList} teachername={this.props.username} selectedClass={this.state.selectedClassName} classSelectCb={this.selectClass} /><br></br>
          <button onClick={() => this.setState({ showCreateClassForm: true})}> Create new class </button><br></br>
          {this.state.showCreateClassForm ? <CreateClass teachername={this.props.username} createNewClass={this.createNewClass}/> : ''}
          <SingleClass selectedClass={this.state.selectedClassObj}/>
        </div>
      </div>
    )
  }
};

export default TeacherDashboard;
