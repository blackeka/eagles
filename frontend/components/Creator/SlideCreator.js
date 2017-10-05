import React from 'react';
import axios from 'axios';
import Uploader from './UploadSlides.js'
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SlideCreator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: props.slide.name || '',
      youTubeUrl: props.slide.youTubeUrl || '',
      youTubeThumbnailUrl: props.slide.youTubeThumbnailUrl || '',
      youTubeTags: props.slide.youTubeTags || '',
      text: props.slide.text || '',
      quizUrl: props.slide.quizUrl || '',
      old: props.slide.old || '',
      lessonRef: props.lessonRef,
      upload: false
    }
  }
  reset () {
    this.setState({
      name: '',
      youTubeUrl: '',
      youTubeThumbnailUrl: '',
      youTubeTags: '',
      text: '',
      quizUrl: '',
    });
  }
  onSubmit (event) {
    event.preventDefault();
    this.submitSlide()
  }

  editState(name, youTubeUrl, text, quizUrl, callback){
    console.log(youTubeUrl)
    this.setState({
      name,
      youTubeUrl,
      quizUrl,
      text
    }, () => {
      callback()
    })
  }

  submitSlide(){
    if (this.state.name !== '') {
      if (this.state.youTubeUrl !== '') {
        if (this.state.youTubeUrl.includes('https://www.youtube.com/watch?v=')) {
          var sliceFrom = this.state.youTubeUrl.indexOf('=');
          var youTubeUrl = this.state.youTubeUrl.slice(sliceFrom + 1);
          this.youTubeQueryToServer(youTubeUrl, (youTubeDataObj) => {
            this.setState({
              youTubeThumbnailUrl: youTubeDataObj.snippet.thumbnails.default.url,
              youTubeTags: youTubeDataObj.snippet.tags
            })
            fetch('/slides', {
              method: "POST",
              body: JSON.stringify(this.state),
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include"
            })
            .then((something) => something.json())
            .then(result => {
              console.log(result, ' that was result this.state is', this.state);
              this.props.fetch(result);
              this.reset();
            })
          });
        } else {
          alert('Incorrect YouTube URL input! Please revise Youtube URL input');
          this.setState({
            youTubeUrl: ''
          });
        }
      } else {
        fetch('/slides', {
          method: "POST",
          body: JSON.stringify(this.state),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        })
        .then((something) => something.json())
        .then(result => {
          console.log(result, ' that was result this.state is', this.state);
          this.props.fetch(result);
          this.reset();
        })
      }
    } else {
        alert('Slide name required. Please enter a slide name.');
    }
  }

  updateOldSlide () {
    var id = this.props.slide._id;
    var body = this.state;
    body.id = id;
    fetch('/slides',{
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    .then(function(result) {
      return result.json();
    })
    .then(function(result) {
      console.log('from line111 slidecreator result after update is', result);
    })
    .catch(function(err) {
      console.log('line 114 err', err);
    })
  }

  uploadToggle () {
    this.setState({
      upload: !this.state.upload
    })
  }

  youTubeQueryToServer(searchString, cb) {
    console.log('seeaarch', searchString)
    fetch('/query?string=' + searchString, {
      method: "GET",
       headers: {
          "Content-Type": "application/json",
        },
      credentials: "include"
    })
    .then((something) => something.json())
    .then((result) => {
      console.log('Youtube query sent to server', result[0]);
      cb(result[0]);
    })
    .catch((err) => {
      console.log('Error: youtube query not sent to server', err);
    })
  }

  render () {
    if (!this.state.upload){
      return (
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup>
            <div className='slideCreator'>
              <ControlLabel>Slide Creator</ControlLabel>
            </div>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Slide Name</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Slide Name'
                value={this.state.name}
                onChange={(event) => this.setState({name: event.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Slide youTubeUrl</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Slide youTube Url'
                value={this.state.youTubeUrl}
                onChange={(event) => this.setState({youTubeUrl: event.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Slide Text</Col>
            <Col sm={10}>
              <FormControl type='text' placeholder='Slide Text'
                value={this.state.text}
                onChange={(event) => this.setState({text: event.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Slide QuizUrl</Col>
            <Col sm={10}>
              <FormControl type='Quiz Url' placeholder='Quiz Url'
                value={this.state.quizUrl}
                onChange={(event) => this.setState({quizUrl: event.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={2}>
              { this.state.old === '' ?
                (<Button type="submit" bsStyle="primary" bsSize="small">Create The Slide</Button>) :
                (<Button onClick={this.updateOldSlide.bind(this)} bsStyle="primary" bsSize="small">
                  Update Slide
                </Button>)
              }
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={2}>
              { this.state.old === '' ?
                (<Button onClick={this.uploadToggle.bind(this)} bsStyle="primary" bsSize="small">Upload Slides Via CSV</Button>) :
                null
              }
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={2}>
              { this.state.old === '' ?
                (<Button onClick={this.props.changeCreateState} bsStyle="warning" bsSize="small">
                  Go Back
                </Button>)
                :
                (<Button onClick={this.props.changeEditingOldSlide} bsStyle="warning" bsSize="small">
                  Finish Update
                </Button>)
              }
              <Link to="/quiz"><Button>Create Quiz</Button></Link>
            </Col>
          </FormGroup>
        </Form>
      );
    } else {
      return (
        <Uploader username={this.props.username} lessonRef={this.state.lessonRef} youTubeQueryToServer={this.youTubeQueryToServer}  uploadToggle={this.uploadToggle.bind(this)} fetch={this.props.fetch}/>
      )
    }
  }

}


export default SlideCreator;
