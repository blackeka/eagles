import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Form, FormGroup, ControlLabel, FormControl, Navbar } from 'react-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  retrieveSearchInput(searchInput) {
    this.setState({
      searchInput: searchInput.target.value
    });
  }

  handleSearchSubmit(event) {
    // event.preventDefault(); //why does search work when dont preventDefault?
    this.props.queryDataBaseWithSearchInput(this.state.searchInput);
  }

  render() {
    return (
      <div>
      {
        this.props.isLoggedIn ? (
          this.props.userRole === 'teacher' ? (
            <Navbar style={navBarStyleTeacher}>
              <Navbar.Form pullLeft>
                <Form onSubmit={ (e) => {
                  e.preventDefault();
                  this.retrieveSearchInput.call(this, event);
                  this.props.history.push('/');
                }}>
                  <FormGroup>
                    <FormControl type='text' placeholder='Search lessons' onChange={this.retrieveSearchInput.bind(this)}/>
                  </FormGroup>{' '}
                  <Link to='/search'>
                    <Button onClick={ (event) => {
                      this.handleSearchSubmit(event);
                      this.props.history.push('/');
                    }}>
                      Search
                    </Button>
                  </Link>{' '}
                <span>
                  <Link to='/'>
                    <Button onClick={ this.props.getLessons }>Home</Button>
                  </Link>{' '}
                  <Link to='/lessons'>
                    <Button>My Lessons</Button>
                  </Link>{' '}
                <Link to='/create'>
                  <Button className="create">Create</Button>
                </Link>{' '}
                <Link to='/applications'>
                  <Button>Applications</Button>
                </Link>{' '}
                <Link to='/user'>
                  <Button>Account</Button>
                </Link>{' '}
                <Button onClick={this.props.logout}>Logout</Button>{' '}
              </span>
              </Form>
              </Navbar.Form>
            </Navbar>
          ) : (

            <Navbar style={navBarStyleStudent}>
              <Navbar.Form pullLeft>
                <Form onSubmit={ (e) => {
                  e.preventDefault();
                  this.retrieveSearchInput.call(this, event);
                  this.props.history.push('/');
                }}>
                <span>
                <Link to='/'>
                  <Button>Dashboard</Button>
                </Link>{' '}
                <Link to='/browse'>
                  <Button>Browse</Button>
                </Link>{' '}
                <Button onClick={this.props.logout}>Logout</Button>{' '}
              </span>
              </Form>
              </Navbar.Form>
            </Navbar>
          )
      ) : ''
      }
      </div>
    );
  }
}

const navBarStyleTeacher = {
  position: 'absolute',
  top: '6%',
  right: '5%',
  width: "60%"
}

const navBarStyleStudent = {
  position: 'absolute',
  top: '6%',
  right: '5%',
  width: "23%"
}

export default NavBar;


// Can change input and button to elements within a form field which should mean you can submit by hitting enter as well as clicking submit
