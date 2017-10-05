import React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';

class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: '',
      selectedLesson: ''
    }
    //bindings
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLessonSelect = this.handleLessonSelect.bind(this);
  }

  handleSubmit() {
    let classObj = {
      name: this.state.className,
      teacher: this.props.teachername,
      lessons: this.state.selectedLesson
    }
    this.setState({
      className: '',
      lessons: ''
    })
    this.triggerCallback(classObj)
  }

  triggerCallback(classObj) { //unbound
    this.props.createNewClass(classObj);
  }

  handleLessonSelect(e) {
    this.setState({
      selectedLesson: e.target.value
    })
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
          <select onChange={this.handleLessonSelect}>
            <option> - Select your lesson - </option>
            {this.props.allLessons.map((lesson, i) => (
              <option key={i}> {lesson.name} </option>
            ))}
          </select>
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
