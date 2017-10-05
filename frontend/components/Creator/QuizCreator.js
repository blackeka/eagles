import React from 'react';
import { Link } from 'react-router-dom';
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
      qforms: [1]
    }
    this.addMore = this.addMore.bind(this);
    this.generateLink = this.generateLink.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
  }
  //props with a lesson id to add to the link

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

  generateLink() {
    
  }
  
  render() {
    return (
      <div>
        <h1>Create A Quiz</h1>
        {this.state.qforms.map((forms, index) => {
          return (
            <div className="question-border">
              <Question onSave={this.saveQuestion}/>
            </div>
          )
        })}
        <Button onClick={this.addMore}>+</Button>
        <Button onClick={this.generateLink}>Generate Link</Button>
        <Link to="/"><Button>Cancel & Go Home</Button></Link>
      </div>
    )
  }
}

export default Quiz;
