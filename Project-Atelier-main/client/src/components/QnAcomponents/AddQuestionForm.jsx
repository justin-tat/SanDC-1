import React from 'react';
import axios from 'axios';

class AddQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      questionBody: '',
      nickname: '',
      email: '',
      isWarningShown: false

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var productId = this.props.productId;
    var body = this.state.questionBody;
    var nickname = this.state.nickname;
    var email = this.state.email;
    var validationResult = this.handleValidation(body, nickname, email);

    if (validationResult) {
      this.setState({
        isValid: true,
        isWarningShown: false
      });
      this.props.addQuestion(productId, body, nickname, email);
      this.props.closeForm();

    } else {
      this.setState({
        isWarningShown: true
      });
    }
  }
  handleValidation(question, nick, email) {
    if (question.length === 0) {
      return false;
    } else if (nick.length === 0) {
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
      warning = <div className='qna-add-question-form-warning-message'>You didn't properly filled all the fields</div>;
    } else {
      warning = <div></div>;
    }
    return (
      <div className='qna-add-new-question-form'>
        <div className='qna-add-question-form-wrapper'>
          {/* <div className = 'qna-add-question-main-title'>Ask a question</div> */}
          <div className ='qna-add-question-subtitle'>Ask a question about the {this.props.name}</div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div className ='qna-add-question-form-your-question'>Your question*</div>
              <input
                className='qna-add-question-input-questionbody'
                name='questionBody'
                id='questionBody'
                type='text'
                maxLength='1000'
                value={this.state.questionBody}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <label>
              <div className='qna-add-question-form-your-nickname'>What's your nickname?*</div>
              <input
                className='qna-add-question-input-nickname'
                name='nickname'
                type='text'
                maxLength='60'
                placeholder='Example: jackson11'
                value={this.state.nickname}
                onChange={this.handleInputChange}
              />
              <br />
              <div className='qna-add-question-form-warning-1'>
               For privacy reasons, do not use your full name or email address
              </div>
            </label>
            <br />
            <label>
              <div className='qna-add-question-form-your-email'>
              Your email?*
              </div>
              <input
                className='qna-add-question-form-input-email'
                name='email'
                type='text'
                maxLength='60'
                placeholder='Example: sample@email.com'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <br />
              <div className='qna-add-question-form-warning-2'>
               For authentication reasons, you will not be emailed
              </div>
            </label>
            <br />
            {warning}
            <input type="submit" className="qna-add-question-form-submit" value="Submit" onClick = {(e)=>this.handleSubmit(e)} />
            <button className='qna-add-question-form-close' onClick={()=> this.props.closeForm()}>Close without submitting</button>
          </form>
        </div>
      </div>

    );
  }
}

export default AddQuestionForm;