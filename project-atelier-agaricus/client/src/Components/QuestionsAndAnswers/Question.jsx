import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  QuestionYesLinkPost() {
    axios.put(this.props.apiUrl + '/qa/questions/' + this.props.question.question_id + '/helpful', {
      headers: {
        'Authorization': this.props.token
      },
      params: {
        question_id: this.props.question.question_id
      }
    }).then(() => {
      console.log('Successfully posted question helpfulness');
    }).catch((err) => {
      console.log('Error posting question helpfulness: ' + err);
    })
  }

  render() {
    if (this.props.index < 2) {
      return (
        <div className='QuestionComponent' data-testid='QuestionComponent'>
          <h2 className='questionBody'>Q: {this.props.question.question_body}</h2>
          <p className='QandAAddAnswer' onClick={ (event) => {
            this.props.trackClicks(event, 'Questions & Answers');
            this.props.showAddAnswerModal(this.props.question.question_body, this.props.question.question_id);
          }}>Add Answer</p>
          <p className='helpfulLine'> | </p>
          <p className='QandAyes' onClick={ (event) => {
            this.props.trackClicks(event, 'Questions & Answers');
            event.target.textContent = `Yes (${this.props.question.question_helpfulness + 1})`;
            this.QuestionYesLinkPost();
          }}>Yes ({this.props.question.question_helpfulness})</p>
          <p className='QandAHelpfulQuestion'>Helpful?</p>
          <AnswersList id={this.props.question.question_id} apiUrl={this.props.apiUrl} token={this.props.token} trackClicks={this.props.trackClicks}/>
        </div>
      )
    } else {
      return (
        <div className='QuestionComponent moreQuestions' data-testid='QuestionComponent'>
          <h2 className='questionBody'>Q: {this.props.question.question_body}</h2>
          <p className='QandAAddAnswer' onClick={ (event) => {
            this.props.trackClicks(event, 'Questions & Answers');
            this.props.showAddAnswerModal(this.props.question.question_body, this.props.question.question_id);
          }}>Add Answer</p>
          <p className='helpfulLine'> | </p>
          <p className='QandAyes' onClick={ (event) => {
            this.props.trackClicks(event, 'Questions & Answers');
            event.target.textContent = `Yes (${this.props.question.question_helpfulness + 1})`;
            this.QuestionYesLinkPost();
          }}>Yes ({this.props.question.question_helpfulness})</p>
          <p className='QandAHelpfulQuestion'>Helpful?</p>
          <AnswersList id={this.props.question.question_id} apiUrl={this.props.apiUrl} token={this.props.token} trackClicks={this.props.trackClicks}/>
        </div>
      )
    }
  }
}

export default Question;