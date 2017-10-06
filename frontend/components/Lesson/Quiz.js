import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class StudentQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
    //get a entered quizcode as prop
    let quizCode = this.props.quizCode;
    //axios.get everything about quiz
    axios.get('/quiz', {params: {quizCode}})
      .then((response) => {
        console.log(response.data)
        this.setState({
          questions: response.data.questions,
          answers: response.data.answers,
          relatedSlides: response.data.relatedSlides,
          lessonRef: response.data.lessonRef
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    return (

    )
  }
}