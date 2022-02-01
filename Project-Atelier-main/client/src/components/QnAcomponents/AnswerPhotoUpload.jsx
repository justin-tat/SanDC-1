import React, {useState} from 'react';

class PhotoUpload extends React.Component {
  //const [file, setFile] = useState([]);
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      filesToSend: []
    };

    this.uploadSingleFile = this.uploadSingleFile.bind(this);

  }



  uploadSingleFile(e) {


    this.setState({
      file: [...this.state.file, URL.createObjectURL(e.target.files[0])],
      filesToSend: [...this.state.filesToSend, e.target.files[0]]
    }, ()=> {
      //var photos = [...this.state.file];
      console.log(e.target.files[0]);

      this.props.handlePhotos(this.state.filesToSend);

    });



  }


  render() {
    return (
      <div className='qna-answer-photo-upload'>
        <div className="form-group preview">
          {this.state.file.length > 0 &&
          this.state.file.map((item, index) => {
            return (
              <div key={item}>
                <img src={item} alt="" width={'350px'}/>
                {/* <button type="button" onClick={() => deleteFile(index)}>
                  delete
                </button> */}
              </div>
            );
          })}
        </div>

        <div className="form-group">
          <input
            type="file"
            disabled={this.state.file.length === 5}
            className="form-control"
            onChange={this.uploadSingleFile}
          />
        </div>

      </div>
    );
  }
}

export default PhotoUpload;