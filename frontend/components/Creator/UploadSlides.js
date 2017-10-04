import React from 'react';
import ReactFileReader from 'react-file-reader';
import axios from 'axios'

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
        return
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
          this.props.editState(row.name, row.youtubeurl, row.text, row.quiz, this.props.submitSlide)
        })
      })


    }
    reader.readAsText(files[0]);
  }

  render(){
    return(
      <div>
        < ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
          <button className='btn'>Upload</button>
        </ReactFileReader>
        <button className='btn' onClick={this.props.uploadToggle}>Go Back</button>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}


export default Uploader
