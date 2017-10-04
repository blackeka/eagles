import React from 'react';
import QuestionForm from './QuestionForm.js';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCount: 1,
      quizQuestions: [],
      answers: [],
      relatedSlides: [],
      currentQindex: 0
    }
  }

  render() {
    return (
      for (let i = 0; i < this.state.questionCount; i++) {
        
      }
    )
  }
}

export default Quiz;