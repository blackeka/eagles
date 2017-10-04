import React from 'react';
import axios from 'axios';
import TeacherClasses from './Subcomponents/TeacherClasses';
import CreateClass from './Subcomponents/CreateClass';

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [{name: 'test', students: ['a', 'b']}],
      studentList: [],
      lessonList: [],
      showCreateClassForm: false
    }
    //bindings
    this.createNewClass = this.createNewClass.bind(this);
  }
  //functions

  componentDidMount() {
    return fetch('/classes', { method: 'GET', credentials: "include" })
    .then( (res) => res.json())
    .then((JSONresponse) => {
      console.log('response from classes endpoint', JSONresponse)
      this.setState({
        classList: JSONresponse
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


  render() {
    return (
      <div classID='teacherDashboardContainer'>
        <h1> Welcome back, {this.props.username}!</h1>
        <div classID='teacherClasses'>
          <TeacherClasses classList={this.state.classList} teachername={this.props.username}/>
          <button onClick={() => this.setState({ showCreateClassForm: true})}> Create Class! </button>
          {this.state.showCreateClassForm ? <CreateClass teachername={this.props.username} createNewClass={this.createNewClass}/> : ''}
        </div>
      </div>
    )
  }
};

export default TeacherDashboard;
