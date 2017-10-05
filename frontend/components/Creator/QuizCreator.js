import React from 'react';
import Question from './QuestionForm.js';

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
      <div>
        <h1>Create A Quiz</h1>
        <Question />
      </div>
    )
  }
}

export default Quiz;
