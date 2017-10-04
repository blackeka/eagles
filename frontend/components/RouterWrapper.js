import React, { Component } from 'react';
import App from './App';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LessonPreviewContainer from './Lesson/LessonPreviewContainer.js';
import Lesson from './Lesson/Lesson.js';
import LessonCreator from './Creator/LessonCreator';
import User from './User';
import Login from './Auth/Login';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

class RouterWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      loggedIn: false,
      displayLogginError: false,
      user: {}
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getLessons = this.getLessons.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.queryDataBaseWithSearchInput = this.queryDataBaseWithSearchInput.bind(this);
    this.organizeSearchResultsBasedOnMostLikes = this.organizeSearchResultsBasedOnMostLikes.bind(this);
  }

  componentDidMount() {
    this.getLessons();
  }

  getLessons() {
    return this.state.user.role === 'teacher' ?
     fetch('/lessons', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((res) => res.json())
    .then((lessons) => {
      this.setState({lessons});
      return lessons
    })
    .catch((err) => console.log('Error getting lessons', err)) : null;
  }

  queryDataBaseWithSearchInput(searchInput) {
    this.getLessons()
    .then((results) => {
      var filteredLessons = this.state.lessons.filter((lesson) => {
        var lowerSearchInput = searchInput.toLowerCase();
        if (lesson.keyWords.includes(lowerSearchInput) || lesson.name.toLowerCase().includes(lowerSearchInput) || lesson.description.toLowerCase().includes(lowerSearchInput) || lowerSearchInput === '') {
          return lesson;
        }
      });
      this.setState({
        lessons: filteredLessons,
      });
      console.log(this.state.lessons)
    })
  }

  organizeSearchResultsBasedOnMostLikes() {
    var lessons = this.state.lessons;
    lessons.sort(function(lesson1, lesson2) {
      return lesson2.likes - lesson1.likes;
    })
    this.setState({
      lessons: lessons
    });
  }

  createAccount(username, password, email, role) {
    let data = {
      username,
      password,
      email,
      role
    };
    fetch('/users', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('got data in create account', data);
      if(data.loggedIn === true) {
        this.setState({
          user: data.userData,
          loggedIn: true,
          displayLogginError: false
        }, () => console.log('in createAccount state', this.state));
      } else {
        this.setState({ displayLogginError: true });
      }
    })
    .catch((err) => console.log('Error creating an account!', err));
  }

  login(username, password) {
    let data = {
      username: username,
      password: password
    };
    fetch('/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('login got data', data);
      if(data.loggedIn === true) {
        this.setState({
          user: data.userData,
          loggedIn: true,
          displayLogginError: false
        }, () => console.log('in Login state', this.state));
         this.getLessons();
      } else {
        this.setState({ displayLogginError: true });
      }
    })
    .catch((err) => console.log('Error Logging In!', err));
  }

  logout() {
    console.log('logging out');
    fetch('/logout', {
      method: "GET",
      credentials: "include"
    });
    this.setState({
      loggedIn: false,
      displayLogginError: false,
      user: {}
     });
  }

  render() {
    return (
      <BrowserRouter>
        <App
        queryDataBaseWithSearchInput={ this.queryDataBaseWithSearchInput }
        logout={ this.logout }
        getLessons={ this.getLessons }
        userRole = {this.state.user.role || ''}
        isLoggedIn = {this.state.loggedIn}
        >
          { this.state.loggedIn ? // If you are logged in allow all routes
            (  this.state.user.role === 'teacher' ?
              (<Switch>
            <Route exact path='/'
              render={ () => (
                <TeacherDashboard
                  username={this.state.user.username}
                  userRef={this.state.user._id}
                />
              )}
            />
            <Route exact path='/lessons'
              render={() => (
                <LessonPreviewContainer
                  lessons= { this.state.lessons.filter((lsn) => lsn.userRef === this.state.user._id) }
                  organizeSearchResultsBasedOnMostLikes={ this.organizeSearchResultsBasedOnMostLikes }
                  getLessons={ this.getLessons }
                  teacherId={this.state.user._id}
                />
              )}
            />
          <Route exact path='/search'
              render={() => (
                <LessonPreviewContainer
                  lessons= { this.state.lessons }
                  organizeSearchResultsBasedOnMostLikes={ this.organizeSearchResultsBasedOnMostLikes }
                  getLessons={ this.getLessons }
                  teacherId={this.state.user._id}
                />
              )}
            />
            <Route path='/lesson/:id'
              render={ ()=> ( component={ Lesson } ) }
            />
            <Route path='/create'
              render={ () => (
                <LessonCreator
                  username={this.state.user.username}
                  userRef={this.state.user._id}
                />
              )}
            />
            <Route path='/user' render={ () =>
                <User
                  user={ this.state.user }
                  getLessons={ this.getLessons }
                />
              }
            />
            <Route path='/logout' render={ () => (
              <Logout logout={ this.logout }/>
            )}
            />
          </Switch>)
         : //student routes
         (<Switch>
            <Route exact path='/'
              render={() => (
                <StudentDashboard
                  studentname={this.state.user.username}
                  />
              )}
            />
            <Route path='/lesson/:id'
              component={ Lesson }
            />
            <Route path='/user' render={ () =>
                <User
                  user={ this.state.user }
                />
              }
            />
            <Route path='/logout' render={ () => (
              <Logout logout={ this.logout }/>
            )}
            />
        </Switch>))

          : // if not logged in, everything goes to the login component
          (<Switch>
              <Route path='*' render={ () =>
                <Login
                  login={ this.login }
                  displayLogginError={ this.state.displayLogginError }
                  createAccount={ this.createAccount }
                />
              }/>
            </Switch>)
          }
        </App>
      </BrowserRouter>
    );
  }
}

export default RouterWrapper;
