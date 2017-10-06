import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio, Button } from 'react-bootstrap';

class MultipleChoice extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      correctness: 'correct',
    }
    this.handleCorrectness = this.handleCorrectness.bind(this);
  }

  handleCorrectness(e) {
    this.setState({
      correctness: e.target.value
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
              inputRef={(FormControl) => this.answer = FormControl} 
            />
          </FormGroup>    
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
            {' '}
            <FormControl value={this.state.value} onChange={this.handleCorrectness}
              componentClass="select" 
              placeholder="correct" 
            >
              <option value="correct">correct</option>
              <option value="incorrect">incorrect</option>
            </FormControl>
            <Button onClick={() => this.props.answerChange(this.answer.value, this.state.correctness)}>Save Answer</Button>
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
              inputRef={(FormControl) => this.answer = FormControl} 
            />
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
            {' '}
            <FormControl 
              componentClass="select" 
              placeholder="correct" 
              onChange={this.handleCorrectness}
            >
              <option value="correct">correct</option>
              <option value="incorrect">incorrect</option>
            </FormControl>
          </FormGroup>   
          <Button onClick={() => this.props.answerChange(this.answer.value, this.state.correctness)}>Save Answer</Button>
        </Radio>
        )
      }
      </div>
    )
  }
}

export default MultipleChoice;

