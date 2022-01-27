import React from 'react';
import ReactDom from 'react-dom';
import { Modal, CloseButton } from 'react-bootstrap';
import Question from './Question.jsx';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      showQuestionModal: false,
      showAnswerModal: false,
      productName: '',
      questionBody: '',
      question_id: '',
      uploadedPhotos: []
    }
  }

  //method to retrieve data from api on render
  componentDidMount() {
    //make call to api
    axios.get(this.props.apiUrl + '/qa/questions', {
      headers: {
        'Authorization': this.props.token
      },
      params: {
        product_id: this.props.currentProduct
      }
    }).then((results) => {
      //store questions data in state
      var questionsUnsorted = results.data.results;
      var sorted = questionsUnsorted.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });

      this.setState({ questions: sorted });
    }).catch((err) => { console.log('Error getting questions from API: ' + err) });

    axios.get(this.props.apiUrl + '/products/' + this.props.currentProduct, {
      headers: {
        'Authorization': this.props.token
      },
      params: {
        product_id: this.props.currentProduct
      }
    }).then((results) => {
      this.setState({ productName: results.data.name });
    }).catch((err) => {
      console.log('Error getting product name: ' + err);
    });
  }

  //method for click of "More Answered Questions" button to make more questions visible
  showMoreQuestions() {
    var hiddenQuestions = document.getElementsByClassName('moreQuestions');
    var questionsButton = document.getElementById('moreQuestionsButton');

    for (var currentElement = 0; currentElement < 2; currentElement++) {
      if (hiddenQuestions[currentElement] !== undefined) {
        hiddenQuestions[currentElement].classList.remove('moreQuestions');
      }
    }
    if (hiddenQuestions.length === 0) {
      questionsButton.style.visibility = 'collapse';
    }
  }

  showAddAnswerModal(answerQuestionBody, id) {
    this.setState({ showAnswerModal: true });
    this.setState({ questionBody: answerQuestionBody });
    this.setState({ question_id: id });
  }

  render() {
    var questionsButton;

    if(this.state.questions.length > 2) {
      var questionsButton = <button id='moreQuestionsButton' onClick={ (event) => {
        this.showMoreQuestions();
        this.props.trackClicks(event, 'Questions & Answers');
      }}>More Answered Questions</button>;
    }

    return (
      <div id="QandA">
        <h2 className='QandATitle'>Questions & Answers</h2>
        <SearchBar questions={this.state.questions} trackClicks={this.props.trackClicks}/>
        <div className='QandAList'>
          {
            this.state.questions.map((question, index) => {
              return (
                <Question key={index} question={question}
                apiUrl={this.props.apiUrl} token={this.props.token}
                trackClicks={this.props.trackClicks} index={index}
                showAddAnswerModal={this.showAddAnswerModal.bind(this)}/>
              )
            })
          }
        </div>
        <Modal size='lg' show={this.state.showQuestionModal} onHide={() => { this.setState({ showQuestionModal: false }) }}>
          <Modal.Header>
            <Modal.Title>Ask Your Question</Modal.Title>
            <CloseButton onClick={(event) => {
              this.props.trackClicks(event, 'Questions & Answers');
              this.setState({ showQuestionModal: false });
            }}>Close</CloseButton>
          </Modal.Header>
          <Modal.Body>
            <p>About the {this.state.productName}</p>
            <p className='askRequiredField'>* indicates required field</p>
            <form onSubmit={(event) => {
              event.preventDefault();
              var warningMessage = 'You must enter the following: ';

              if(event.target[0].value === '') {
                warningMessage += ' "Your Question" ';
              }
              if(event.target[1].value === '') {
                warningMessage += ' "What is your nickname" ';
              }
              if(!event.target[2].value.includes('@') || !event.target[2].value.includes('.')) {
                warningMessage += ' "Your email" ';
              }

              if (warningMessage.length > 30) {
                alert(warningMessage);
              } else {
                axios.post(this.props.apiUrl + '/qa/questions',
                  {
                    body: event.target[0].value,
                    name: event.target[1].value,
                    email: event.target[2].value,
                    product_id: this.props.currentProduct
                  },
                  {
                    headers: {
                      'Authorization': this.props.token
                    }
                  }).then(() => {
                    console.log('Successfully posted new question');
                  }).catch((err) => {
                    console.log('Error posting new question: ' + err);
                  });
                  this.setState({ showQuestionModal: false });
              }
            }}>
              <label className='yourQuestionLabel'>
                Your Question*
                <textarea className='yourQuestionInput' onClick={(event) => { this.props.trackClicks(event, 'Question & Answers') }} maxLength={1000}></textarea>
              </label>
              <label className='askNicknameLabel'>
                What is your nickname*
                <input type='text' className='askNicknameInput' maxLength={60} placeholder='Example: jackson11!' onClick={(event) => { this.props.trackClicks(event, 'Questions & Answers') }}></input>
                <p className='askPrivacyReasons'>For privacy reasons, do not use your full name or email address</p>
              </label>
              <label className='askEmailLabel'>
                Your email*
                <input type='text' className='askEmailInput' placeholder='sample@email.com' maxLength={60} onClick={(event) => { this.props.trackClicks(event, 'Questions & Answers') }}></input>
                <p className='askAuthReasons'>For authentication reasons, you will not be emailed</p>
              </label>
              <button type='submit' className='askSubmit' onClick={(event) => { this.props.trackClicks(event, 'Questions & Answers') }}>Submit</button>
            </form>
          </Modal.Body>
        </Modal>
        <Modal size='lg' show={this.state.showAnswerModal} onHide={() => { this.setState({ showAnswerModal: false }) }}>
          <Modal.Header>
            <Modal.Title>Submit Your Answer</Modal.Title>
            <CloseButton onClick={(event) => {
              this.props.trackClicks(event, 'Questions & Answers');
              this.setState({ showAnswerModal: false });
              this.setState({ uploadedPhotos: [] });
            }}>Close</CloseButton>
          </Modal.Header>
          <Modal.Body>
            <p>About the {this.state.productName} : {this.state.questionBody}</p>
            <p className='askRequiredField'>* indicates required field</p>
            <form onSubmit={ (event) => {
              event.preventDefault();
              var warningMessage = 'You must enter the following: ';

              if(event.target[0].value === '') {
                warningMessage += ' "Your Answer" ';
              }
              if(event.target[1].value === '') {
                warningMessage += ' "What is your nickname" ';
              }
              if(!event.target[2].value.includes('@') || !event.target[2].value.includes('.')) {
                warningMessage += ' "Your email" ';
              }

              if (warningMessage.length > 30) {
                alert(warningMessage);
              } else {
                var photoURLs = [];
                this.state.uploadedPhotos.map((photo) => {
                  photoURLs.push(photo.name);
                })
                axios.post(this.props.apiUrl + '/qa/questions/' + this.state.question_id + '/answers',
                  {
                    body: event.target[0].value,
                    name: event.target[1].value,
                    email: event.target[2].value,
                    photos: photoURLs
                  },
                  {
                    headers: {
                      'Authorization': this.props.token
                    },
                    params: {
                      question_id: this.state.question_id
                    }
                  }).then(() => {
                    console.log('Successfully posted new answer');
                  }).catch((err) => {
                    console.log('Error posting new answer: ' + err);
                  });
                  this.setState({ showAnswerModal: false });
              }
            }}>
            <label className='yourAnswerLabel'>
              Your Answer*
              <textarea className='yourAnswerInput' maxLength={1000} onClick={(event) => { this.props.trackClicks(event, 'Questions & Answers') }}></textarea>
            </label>
            <label className='answerNicknameLabel'>
              What is your nickname*
              <input className='answerNicknameInput' type='text' placeholder='Example: jack543!' maxLength={60} onClick={(event) => { this.props.trackClicks(event, 'Questions & Answers') }}></input>
              <p className='answerPrivacy'>For privacy reasons, do not use your full name or email address</p>
            </label>
            <label className='answerEmailLabel'>
              Your email*
              <input className='answerEmailInput' type='text' placeholder='Example: jack@email.com' maxLength={60} onClick={(event) => { this.props.trackClicks(event, 'Questions & Answers') }}></input>
              <p className='answerAuthReasons'></p>
            </label>
            <label className='answerUploadPhotosLabel'>
              Upload your photos
              <input className='answerUploadPhotosInput' type='file' accept='images' onChange={(event) => {
                this.props.trackClicks(event, 'Questions & Answers');
                if(event.target.files.length !== 0) {
                  var photosArray = this.state.uploadedPhotos;
                  photosArray.push(event.target.files[0]);
                  this.setState({ uploadedPhotos: photosArray });
                  if (this.state.uploadedPhotos.length >= 5) {
                    var uploadButton = document.getElementsByClassName('answerUploadPhotosInput')[0];
                    uploadButton.style.visibility = 'hidden';
                  }
                }
              }} onClick={(event) => { this.props.trackClicks(event, 'Questions & Answers') }}></input>
              <p className='oneAtATime'>Choose image files one at a time</p>
            </label>
            <button type='submit' className='answerSubmit' onClick={(event) => { this.props.trackClicks(event, 'Questions & Answers') }}>Submit</button>
            </form>
            {
              this.state.uploadedPhotos.map((currentPhoto, index) => {
                var photo = <img className='answerThumbnail' src={URL.createObjectURL(currentPhoto)} alt={currentPhoto.name} onLoad={() => { URL.revokeObjectURL(photo.src) }}></img>
                return <a target='_blank' href={URL.createObjectURL(currentPhoto)}>{photo}</a>;
              })
            }
          </Modal.Body>
        </Modal>
        {questionsButton}
        <button className='addAQuestion' onClick={(event) => {
          this.props.trackClicks(event, 'Questions & Answers');
          this.setState({ showQuestionModal: true });
        }}>Add A Question</button>
      </div>
    )
  }
}

export default QandA;