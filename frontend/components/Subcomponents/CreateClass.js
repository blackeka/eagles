import React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';

class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: '',
      lessons: []
    }
    //bindings
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    let classObj = {
      name: this.state.className,
      teacher: this.props.teachername,
      lessons: []
    }
    this.setState({
      className: '',
      lessons: []
    })
    this.triggerCallback(classObj)
  }

  triggerCallback(classObj) { //unbound
    this.props.createNewClass(classObj);
  }

  render() {
    return (
      <div className='classForm'>

        <Form horizontal onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>ClassName</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Class Name'
                value={this.state.className}
                onChange={(e) => this.setState({ className: e.target.value })}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={10}>
            <Button onClick={this.handleSubmit}>
              Submit
            </Button>
            </Col>
          </FormGroup>
        </Form>

      </div>
    )
  }
};

export default CreateClass;
