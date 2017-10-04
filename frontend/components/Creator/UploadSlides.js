import React from 'react';
import ReactFileReader from 'react-file-reader';

class Uploader extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.handleFiles = this.handleFiles.bind(this)
  }

  handleFiles(files){
    var reader = new FileReader();
    reader.onload = function(e) {
      let result = reader.result
      let headers = ['name','text','quiz','youtubeurl']
      result = result.split('\n').map(row => row.split(',')).filter(row => row.length !== 1);
        //check for extra columns or commas in a cell
      if (result.some(row => row.length > 4)){
        alert('Too many columns, please ensure you have only the four required columns and no commas in cells')
        return
        //check for correct headers
      } else if (result[0].map(values => values.toLowerCase().trim()).some(value => headers.indexOf(value) === -1)){
        alert('Incorrect Column Headers')
      } else if (result[0].map(values => values.toLowerCase().trim()).some(value => headers.indexOf(value) === -1)){
        alert('Incorrect Column Headers')
      } else {
        console.log(result)
      }
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
