import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Panel, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      creatingAccount: false,
      email: '',
      role: 'teacher',
      radioVal: 1
    }
    this.onRoleChange = this.onRoleChange.bind(this);
  }

  onRoleChange(val) {
    let rolez = ['teacher', 'student'];
    var selectedRole = rolez[val-1];
    this.setState({
      role: selectedRole,
      radioVal: val
    })
  }

  render() {
    return (
        <div>
        <h3> Welcome to Class Reactor, a learning platform for students and teachers! </h3>
        <Form horizontal onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            {
              this.props.displayLogginError ?
              (<Panel header='Login Error!' bsStyle="danger"></Panel>) : ''
            }
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}></Col>
            <Col sm={10}>
              <FormControl className="username" type='text' placeholder='Username'
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}></Col>
            <Col sm={10}>
              <FormControl className="password" type='password' placeholder='Password'
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Col>
          </FormGroup>
          { this.state.creatingAccount ?
          ( <div>
            <FormGroup>
            <Col componentClass={ControlLabel} sm={2}></Col>
            <Col sm={10}>
              <FormControl className="email" type='email' placeholder='Email'
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </Col>
          </FormGroup>

          <ButtonToolbar>
            <ToggleButtonGroup type='radio' name='options' value={this.state.radioVal} onChange={this.onRoleChange} style={toggleButtonStyle}>
              <ToggleButton value={1}> Teacher </ToggleButton>
              <ToggleButton value={2}> Student </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar><br></br>

          </div>
          )
          : ''
          }
      { !this.state.creatingAccount ? (
          <FormGroup>
            <Col smOffset={2} sm={2}>
              <Button onClick={() => this.props.login(this.state.username, this.state.password)}>
                Log In!
              </Button>
              <Button onClick={() => this.setState({ creatingAccount: true })}>
                Create Account
              </Button>
            </Col>
          </FormGroup>
          ) : (
            <FormGroup>
            <Col smOffset={2} sm={2}>
              <Button onClick={ () => this.setState({ creatingAccount: false }) }>
                Go Back
              </Button>
              <Button onClick={() => {
                this.props.createAccount(this.state.username, this.state.password, this.state.email, this.state.role);
                }}>
                Create Account!
              </Button>
            </Col>
            </FormGroup>
          )}
        </Form>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
        )
    }
}

const toggleButtonStyle = {
  position: "relative",
  display: "inline block",
  left: "17%"
}

export default Login;
