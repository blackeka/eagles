import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio, Button } from 'react-bootstrap';
import MultipleChoice from './MultipleChoice.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      shortAnswer: '',
      mcAnswers: [1, 2, 3],
      relatedSlides: [],
      currentQindex: 0,
      mcType: false,
      answerCount: 0,
      type: null
    }

    this.questionChange = this.questionChange.bind(this);
    this.shortAnswerChange = this.shortAnswerChange.bind(this);
    this.mcAnswerChange = this.mcAnswerChange.bind(this);
    this.relatedSlideChange = this.relatedSlideChange.bind(this);
    this.checkedBox = this.checkedBox.bind(this);
    this.filled = this.filled.bind(this);
    this.noMultipleChoice = this.noMultipleChoice.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
  }

  questionChange(e) {
    this.setState({
      question: e.target.value
    });
  }

  shortAnswerChange(e) {
    this.setState({
      shortAnswer: e.target.value
    });
  }
  //change at a spefic index
  mcAnswerChange(e) {
    this.state.mcAnswers[e.target.index] = e.target.value;
    // this.setState({
    //   mcAnswers: 
    // });
  }

  relatedSlideChange(e) {
    this.setState({
      relatedSlide: e.target.value
    });
  }
  
  checkedBox(e) {
    this.setState({
      mcType: 'checkbox',
      answerCount: 0,
      mcAnswers: ['']
    }, () => {
      console.log(this.state.mcAnswers)
    });
  }

  filled(e) {
    this.setState({
      mcType: 'radio',
      answerCount: 0,
      mcAnswers: ['']
    }, () => {
      console.log(this.state.mcType)
    });
  }

  noMultipleChoice() {
    this.setState({
      mcType: null,
      answerCount: 0,
      mcAnswers: []
    }, () => {
      console.log(this.state.mcType)
    });
  }

  saveAnswer() {

  }

  addOption() {
    let temp = [];
    this.state.mcAnswers.map((answer) => {
      temp.push(answer);
    });
    temp.push('');
    this.setState({
      mcAnswers: temp
    });
  }

  deleteOption(e, data) {
    let temp = [];
    let target = 0;
    console.log(e.nativeEvent.value, 'OR', data)
    // console.log(target)
    this.state.mcAnswers.map((answer) => {
      if(answer !== target) {
        temp.push(answer);
      }
    });
    this.setState({
      mcAnswers: temp
    });
  }

  render() {
    return (
      //div currentQindex
      <div className={this.state.currentQindex}>
        <Form>
          <FormGroup controlId="formControlsQuestion">
            <ControlLabel>Question</ControlLabel>
            {' '}
            <FormControl 
              type="text" 
              placeholder="Write a quiz question" 
              value={this.state.question}
              onChange={this.questionChange}
            />
          </FormGroup>
          {' '}
          <FormGroup controlId="formControlsAnswer">
            <ControlLabel>Answer</ControlLabel>
            {' '}
            <FormControl 
              type="text" 
              placeholder="Provide a short answer example" 
              value={this.state.shortAnswer}
              onChange={this.shortAnswerChange}
            />
          </FormGroup>
          { !this.state.mcType ?
            <div>
              <Button onClick={this.checkedBox}>
                Multiple Correct Answers <Checkbox></Checkbox>
              </Button>
              <Button onClick={this.filled}>
                Single Correct Answer <Radio></Radio>
              </Button>
            </div>
            :
            <div>
              {this.state.mcAnswers.map((answer, i) => {
                return (<MultipleChoice type={this.state.mcType} key={i} value={answer} answerChange={this.saveAnswer} deleteOption={this.deleteOption}/> )
              }) }
              <Button onClick={this.addOption}>+</Button>
            </div>
          }
          <Button onClick={this.noMultipleChoice} > None </Button>
          {' '}
          <FormGroup controlId="formControlsRelatedSlides">
            <ControlLabel>Slides</ControlLabel>
            {' '}
            <FormControl 
              type="text" 
              placeholder="What are the related slides" 
              value={this.state.relatedSlides}
              onChange={this.relatedSlideChange}
            />
          </FormGroup>
        </Form>
      </div>
        //question input
          //onchange //value 
        //shortAnswer input
          //onchange //value
        //multiple choice options & answers
          //onchange //value //onclick=delete for each
        //related slides
          //onchange //value
        //add more button
        //delete button
    )
  }
}

export default Question;