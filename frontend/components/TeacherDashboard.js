import React from 'react';
import axios from 'axios';
import TeacherClasses from './Subcomponents/TeacherClasses';
import CreateClass from './Subcomponents/CreateClass';
import SingleClass from './Subcomponents/SingleClass';

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [{name: 'placeholder', students: ['a', 'b']}],
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
      this.setState({
        classList: JSONresponse,
        selectedClassName: JSONresponse[0].name,
        selectedClassObj: JSONresponse[0]
      }, () => console.log('state after mount', this.state))
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

    return fetch('/classes', { method: 'GET', credentials: "include" })
    .then( (res) => res.json())
    .then((JSONresponse) => {
      var selClassObj = JSONresponse.filter((cobj) => cobj.name === selClass)[0];
      this.setState({
        selectedClassName: selClass,
        selectedClassObj: selClassObj
      }, () => console.log('class selected', this.state))
    })
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
