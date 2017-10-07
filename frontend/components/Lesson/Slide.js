import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Quiz from './Quiz.js';

class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getQuizCode: false,
      quizCode: null
    }
  }

  goToQuiz(e) {
    let code = this.code.value;
    console.log(code)
    this.setState({
      quizCode: code
    })
  }

  render() {
    return (
      <div>
      {!this.state.quizCode ?
        (<div style={slideContainerStyle}>
          <h1>{ this.props.slideData.name || 'No Slide Name' }</h1>
          <div className="youtubeVideoContainer">
          { this.props.videoIdOfClickedOnVideo ? (
            <iframe style={{width: 500, height: 350, float: "left"}} className="youtubeVideo" src={ 'https://www.youtube.com/embed/' + this.props.videoIdOfClickedOnVideo} allowFullScreen></iframe>
          ) : (
            <div></div>
          )}
            <p className="slideText">{this.props.slideData.text}</p>
          </div>
          <div>
              <p>{this.props.slideData.quizUrl}</p>
          </div>
          <div className="slideButtons"  style={{float: "right"}}>
            <Button type="button" onClick={() => this.props.previousSlideClick(this.props.index)}>Previous Slide</Button>
            <Button type="button" onClick={() => this.props.nextSlideClick(this.props.index)}>Next Slide</Button><br></br>
            <progress value={this.props.index} max={this.props.totalLength}>Progress</progress>
            { this.props.role === 'teacher' ?
              ( <div className='teacherOptions'>
                <Button type="button" onClick={this.goToQuiz.bind(this)}>Quiz</Button>
                <Button type="button" onClick={() => this.props.exitClick()}>Exit</Button>
              </div> )
              : ( this.props.complete && !this.state.getQuizCode ? (
                  <Button type="button" onClick={() => this.setState({getQuizCode: true})}>Quiz</Button>
                ) : this.state.getQuizCode ?
                (  <FormGroup controlId="formControlsShortAnswer">
                    <ControlLabel>Quiz Code</ControlLabel>
                    <input type="textarea" placeholder="Enter Quiz Code" ref={(input) => this.code = input} />
                    <Button onClick={this.goToQuiz.bind(this)}>Get Quiz</Button>
                  </FormGroup> ) : ''
              )

            }
          </div>
        </div>) :
        <Quiz quizCode={this.state.quizCode} role={this.props.role} />
        }
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>
    );
  }
}

const slideContainerStyle = {
  border: "solid black 1px",
  borderRadius: "10px",
  width: "65%",
  margin: 'auto',
  textAlign: "center",
  backgroundColor: "#f7f4f4"
}

export default Slide;
