import React from 'react';
import ReactFileReader from 'react-file-reader';
import axios from 'axios'
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Uploader extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.handleFiles = this.handleFiles.bind(this)
  }

  youTubeChecker(url){
    if (url.includes('https://www.youtube.com/watch?v=')  || url === '') {
      return true
    } else {
      return false
    }
  }

  keysToLowerCase(obj){
    var key, keys = Object.keys(obj);
    var n = keys.length;
    var newobj = {};
    while (n--) {
      key = keys[n];
      newobj[key.toLowerCase()] = obj[key];
    }
    return newobj
  }

  handleFiles(files){
    var reader = new FileReader();
    reader.onload = (e) => {
      let result = reader.result
      let commaCount = 0;
      let newLineCount = 0;
      result.split('').forEach(char => {
        if (char === ','){
          commaCount++
        }
        if (char === '\n'){
          newLineCount++
        }
      });
      if (commaCount / newLineCount !== 3){
        alert('Too many columns, please ensure you have only the four required columns and no commas in cells')
        return 'error involving commas'
      }
      let headers = ['quiz','text','youtubeurl','name']
      axios.post('/upload', {
        result:result
      })
      .then((data) => {
        let result = data.data
        result = result.map(row => {
          return this.keysToLowerCase(row)
        })
        console.log(result)
        let incorrectHeader = result.some(row => {
          return Object.keys(row).map(header => header.trim()).some(header => headers.indexOf(header) === -1)
        })
        if (incorrectHeader){
          alert('Incorrect Headers')
          return
        }
        if (!result.every(row => row.name !== '')){
          alert('Name of Slide Cannot be Blank')
          return
        }
        if (!result.every(row => this.youTubeChecker(row.youtubeurl))){
          alert('Incorrect YouTube URL input! Please revise Youtube URL input');
          return
        }
        result.forEach((row) => {
          this.submitSlide(row)
        })
      })
    }
    reader.readAsText(files[0]);
  }
  testFail(e){
    e.preventDefault()
    let test = 'test,test,test,test\ndata,data,data,data\n'
    let myblob = new Blob([test], {
      type: 'text/plain'
    });
    this.handleFiles([myblob])
  }

  testPass(e){
    e.preventDefault()
    let test = 'quiz,name,text,youtubeurl\ndata,,data,data\n'
    let myblob = new Blob([test], {
      type: 'text/plain'
    });
    this.handleFiles([myblob])
    axios.delete('/lessons')
  }

  submitSlide(obj){
    if (obj.name !== '') {
      if (obj.youtubeurl !== '') {
        var sliceFrom = obj.youtubeurl.indexOf('=');
        var youTubeUrl = obj.youtubeurl.slice(sliceFrom + 1);
        this.props.youTubeQueryToServer(youTubeUrl, (youTubeDataObj) => {
          let youTubeThumbnailUrl = youTubeDataObj.snippet.thumbnails.default.url;
          let youTubeTags = youTubeDataObj.snippet.tags;
          fetch('/slides', {
            method: "POST",
            body: JSON.stringify({
              youTubeTags: youTubeTags,
              youTubeThumbnailUrl: youTubeThumbnailUrl,
              youTubeUrl: obj.youtubeurl,
              name: obj.name,
              lessonRef: this.props.lessonRef,
              text: obj.text,
              quizUrl: obj.quiz
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include"
          })
          .then((something) => something.json())
          .then(result => {
            this.props.fetch(result);
          })
        });
      } else {
        fetch('/slides', {
          method: "POST",
          body: JSON.stringify({
            youTubeUrl: obj.youtubeurl,
            name: obj.name,
            lessonRef: this.props.lessonRef,
            text: obj.text,
            quizUrl: obj.quiz,
            youTubeTags: '',
            youTubeThumbnailUrl: ''
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        })
        .then((something) => something.json())
        .then(result => {
          this.props.fetch(result);
        })
      }
    } else {
        alert('Slide name required. Please enter a slide name.');
    }
  }

  render(){
    return(
      <div>
      <Form horizontal>
        <FormGroup>
          <div className='slideCreator'>
            <ControlLabel>Slide Uploader</ControlLabel>
          </div>
        </FormGroup>
        <h6>Please upload a CSV with headers 'quiz','text','youtubeurl' and 'name'. Name is required.</h6 >
        {this.props.username === 'cypress' ?  (
          <div>
            <button className='fail' name="button" onClick={this.testFail.bind(this)}>Test Fail</button>
            <button className='pass' name="button" onClick={this.testPass.bind(this)}>Test Pass</button>
          </div>
        )
        :  (
          <FormGroup>
            <Col smOffset={0} sm={2}>
              <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                <Button className='btn' bsStyle="primary" bsSize="small">Upload</Button>
              </ReactFileReader>
            </Col>
          </FormGroup>
        )}
        <FormGroup>
          <Col smOffset={0} sm={2}>
            <Button className='btn' onClick={this.props.uploadToggle} bsStyle="warning" bsSize="small">
              Go Back
            </Button>
          </Col>
        </FormGroup>
        <br/>
      </Form >
      </div>
    )
  }
}


export default Uploader
