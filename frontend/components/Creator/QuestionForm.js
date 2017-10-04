import React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      shortAnswer: '',
      mcAnswer: [],
      relatedSlide: [],
      currentQindex: 0
    }

    this.questionChange = this.questionChange.bind(this);
    this.shortAnswerChange = this.shortAnswerChange.bind(this);
    this.mcAnswerChange = this.mcAnswerChange.bind(this);
    this.mcAnswerChange = this.mcAnswerChange.bind(this);
  }

  questionChange(e) {
    this.setState({
      question: e.target.value
    })
  }

  shortAnswerChange(e) {
    this.setState({
      shortAnswer: e.target.value
    })
  }

  mcAnswerChange(e) {
    this.setState({
      mcAnswer: e.target.value
    })
  }

  relatedSlideChange(e) {
    this.setState({
      relatedSlide: e.target.value
    })
  }
  
  render() {
    return (
      //div currentQindex
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