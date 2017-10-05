import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Question from './QuestionForm.js';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: 1,
      quizQuestions: [''],
      answers: [''],
      relatedSlides: [''],
      currentQindex: 0,
      qforms: [1],
      quizCode: null
    }
    this.addMore = this.addMore.bind(this);
    this.generateCode = this.generateCode.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
  }
  
  addMore() {
    let forms = this.state.qforms;
    let count = this.state.questionCount;
    forms.push(count++);
    this.setState({
      qforms: forms,
      questionCount: count
    }, () => {
      console.log(`here is qforms ${this.state.qforms}`)
    })
  }
  
  saveQuestion(q, sA, mcA, slides) {
    let forms = this.state.qforms;
    let qs = this.state.quizQuestions;
    qs.push(q);
    let as = this.state.answers;
    sA.length ? as.push(sA) : as.push(mcA);
    let rs = this.state.relatedSlides;
    rs.push(slides);
    this.setState({
      quizQuestions: qs,
      answers: as,
      relatedSlides: rs
    }, () => {
      console.log(this.state)
    })
  }
  
  generateCode() {
    let code = Math.floor((Math.random() * 9999) + 1000 )
    let questions = this.state.quizQuestions;
    let answers = this.state.answers;
    let relatedSlides = this.state.relatedSlides;
    let lessonRef = this.props.lessonRef;
    this.setState({
      quizCode: code
    }, () => {
      let quizCode = this.state.quizCode;
      axios.post('/quiz', {questions, answers, relatedSlides, quizCode, lessonRef})
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('error here', error);
        })
  
      console.log(questions, answers, relatedSlides, quizCode, lessonRef)
    })
  }
  //axios to return quiz to the lesson
  
  render() {
    return (
      <div>
        <h1>Create A Quiz</h1>
        {this.state.qforms.map((forms, index) => {
          return (
            <div key={index} className="question-border">
              <Question key={index*10} onSave={this.saveQuestion}/>
            </div>
          )
        })}
        <Button onClick={this.addMore}>+</Button>
        <Button onClick={this.generateCode}>Done: Generate Link</Button>
        <Link to="/"><Button>Cancel & Go Home</Button></Link>
        <Button className='btn' onClick={this.props.createToggle} bsStyle="warning" bsSize="small">
           Go Back
        </Button>
        {' '}
        {this.state.quizCode ?  <h1>Quiz Code:  { this.state.quizCode } </h1> : <div></div>}
      </div>
    )
  }
}

export default Quiz;
