import React from 'react';
import axios from 'axios';
import AnswerPhotoUpload from './AnswerPhotoUpload.jsx';

class AddAnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBody: '',
      nickname: '',
      email: '',
      photos: [],
      isWarningShown: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhotos = this.handlePhotos.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handlePhotos(photos) {
    console.log('triggered handle photos');
    this.setState({
      photos: photos
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var questionId = this.props.questionId;
    var body = this.state.answerBody;
    var nickname = this.state.nickname;
    var email = this.state.email;
    var photos = this.state.photos;
    var validationResult = this.handleValidation(body, nickname, email);
    var productId = this.props.productId;

    if (validationResult) {
      this.setState({
        isWarningShown: false
      });
      this.props.addNewAnswer(questionId, body, nickname, email, photos, productId);
      this.props.closeAnswer();


    } else {
      this.setState({
        isWarningShown: true
      });
    }
  }

  handleValidation(answer, nickname, email) {
    if (answer.length === 0) {
      return false;
    } else if (nickname.length === 0) {
      return false;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    let warning;
    if (this.state.isWarningShown) {
      warning = <div className='qna-add-answer-form-warning-message'>You didn't filled all the fields properly</div>;
    } else {
      warning = <div></div>;
    }
    return (
      <div className='qna-add-answer-form'>
        <div className='qna-add-answer-form-wrapper'>
          <div className='qna-add-answer-form-subtitle'>Submit your answer</div>
          <div className='qna-add-answer-form-product-name'>{this.props.productName}: {this.props.question_body}</div>
          <form>
            <label>
              <div className='qna-add-answer-form-your-answer'>
              Your answer*
              </div>
              <input
                className='qna-add-answer-form-input-answer'
                name='answerBody'
                type='text'
                maxLength='1000'
                value={this.state.answerBody}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <label>
              <div className='qna-add-answer-form-your-nickname'>
              What's your nickname?*
              </div>
              <input
                className='qna-add-answer-form-input-nickname'
                name='nickname'
                type='text'
                maxLength='60'
                placeholder='Example: jack543'
                value={this.state.nickname}
                onChange={this.handleInputChange}
              />
              <br />
              <div className='qna-add-answer-form-warning-1'>
              For privacy reasons, do not use your full name or email address
              </div>
            </label>
            <br />
            <label>
              <div className='qna-add-answer-form-your-email'>
              Your email?*
              </div>
              <input
                className='qna-add-answer-form-input-email'
                name='email'
                type='text'
                maxLength='60'
                placeholder='Example: jack@email.com'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <br />
              <div className='qna-add-answer-form-warning-2'>
             For authentication reasons, you will not be emailed
              </div>
            </label>
            <br />
            <label>
              <br />
              <AnswerPhotoUpload handlePhotos={this.handlePhotos} />
            </label>
            {warning}
            <input type="submit" className='qna-add-answer-form-submit' value="Submit" onClick = {this.handleSubmit} />
            <button type='button' className='qna-add-answer-form-close' onClick={this.props.closeAnswer}>Close without adding</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddAnswerForm;