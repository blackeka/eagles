import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Notifications from './NotificationCenter'

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
      <Notifications />
        { this.props.children || 'no children!' }
      </div>
    );
  }
}



export default withRouter(App);
