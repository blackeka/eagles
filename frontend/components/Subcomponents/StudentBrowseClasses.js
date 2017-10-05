import React from 'react';
import $ from 'jquery';
import ApplyToClass from './ApplyToClass';

class BrowseClasses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      selectedClass: {},
      showApplication: false,
      applicationText: ''
    }
    //bindings
    this.handleClassSelect = this.handleClassSelect.bind(this);
    this.applicationTextCb = this.applicationTextCb.bind(this);
    this.closeApp = this.closeApp.bind(this);
  }
  //functions

  componentDidMount() {
    return fetch('/classes', { method: 'GET', credentials: "include" })
    .then( (res) => res.json())
    .then((JSONresponse) => {
      console.log('response from classes endpoint', JSONresponse)
      this.setState({
        classList: JSONresponse
      }, () => console.log('student browse state after mount', this.state))
    })
  };

  handleClassSelect(e) {
    console.log('event target/nameofclass', $(e.target).attr('classid'))
    $('.browseClass').css("background-color","white");
    $(e.target).css("background-color","#d1d3d6");
    var nameOfClass = $(e.target).attr('classid');
    var classObj = this.state.classList.filter((klass) => klass.name === nameOfClass)[0];
    this.setState({
      selectedClass: classObj,
      showApplication: true
    })
  };

  applicationTextCb(text) {
    this.setState({
      applicationText: text
    })
  }

  closeApp() {
    this.setState({
      applicationText: '',
      showApplication: false
    })
  }

  render() {
    return (
      <div classID='browseClassesContainer'>

        {this.state.classList.map((klass, i) => (
          <div className='browseClass' key={klass.name} classID={klass.name} style={browseClassStyle} onClick={this.handleClassSelect}>
            <a> Class name: {klass.name} </a><br></br>
            <a> Teacher: {klass.teacher} </a>
          </div>
        ))}
        <br></br>
        {this.state.showApplication ?
          <ApplyToClass classObj={this.state.selectedClass} studentname={this.props.studentname}
                        applicationTextCb={this.applicationTextCb} appText={this.state.applicationText}
                        hideApplicationCb={this.closeApp}/>
        : ''}

      </div>
    )
  }
};

const browseClassStyle = {
  border: "solid black 1px",
  borderRadius: "50px",
  display: "inline block",
  textAlign: "center",
  width: "30%",
  color: "black"
}

export default BrowseClasses;
