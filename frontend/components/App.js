import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Question from './Creator/QuestionForm.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar
          history= { this.props.history }
          queryDataBaseWithSearchInput={this.props.queryDataBaseWithSearchInput}
          logout={ this.props.logout }
          getLessons={ this.props.getLessons }
          userRole = {this.props.userRole}
          isLoggedIn = {this.props.isLoggedIn}
        />
        <Question />
        { this.props.children || 'no children!' }
      </div>
    );
  }
}



export default withRouter(App);
