import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio, Button } from 'react-bootstrap';

class MultipleChoice extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      answer: ''
    }
  }

  handleAnswerChange() {
    this.setState({
      answer: e.target.value
    }, () => {
      this.props.answerChange(this.state.answer);
    })
  }

  render () {
    return (
      <div>
      {(this.props.type && this.props.type === 'checkbox') ? (
        <Checkbox>
          <FormGroup controlId="formControlsCheckboxes">
            <ControlLabel>Answer Choice</ControlLabel>
            {' '}
            <FormControl 
              type="text" 
              placeholder="Enter multiple choice answer" 
              defaultValue={this.props.value}
              onChange={handleAnswerChange}
            />
          </FormGroup>
          <Button value={this.props.value} onClick={(e, value) => console.log() }>X</Button>
        </Checkbox>) : 
        (<Radio>
          <FormGroup controlId="formControlsCheckboxes">
            <ControlLabel>Answer Choice</ControlLabel>
            {' '}
            <FormControl 
              type="text" 
              placeholder="Enter multiple choice answer" 
              defaultValue={this.state.value}
              onChange={handleAnswerChange}
            />
            </FormGroup>
            <Button onClick={(e, value) => this.props.deleteOption(e, value)}>X</Button>
        </Radio>)
      }
      </div>
    )
  }
}

export default MultipleChoice;

