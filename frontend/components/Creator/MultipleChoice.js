import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio, Button } from 'react-bootstrap';

class MultipleChoice extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    }
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
              inputRef={(FormControl) => this.answer = FormControl} 
            />
            <Button onClick={() => this.props.answerChange(this.answer.value)}>Save Answer</Button>
          </FormGroup>        
        </Checkbox>) : 
        (
        <Radio>
          <FormGroup controlId="formControlsCheckboxes">
            <ControlLabel>Answer Choice</ControlLabel>
            {' '}
            <FormControl 
              type="text" 
              placeholder="Enter multiple choice answer" 
              inputRef={(input) => this.answer = input} 
            />
          </FormGroup>
          <Button onClick={() => this.props.answerChange(this.answer.value)}>Save Answer</Button>
        </Radio>
        )
      }
      </div>
    )
  }
}

export default MultipleChoice;

