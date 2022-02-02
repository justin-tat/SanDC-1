import React from 'react';
import axios from 'axios';
import moment from 'moment';


class QuestionsListItemAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReported: false,
      isHelpful: false
    };

    this.clickOnYes = this.clickOnYes.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  clickOnYes() {
    let answerId = this.props.answer.id;
    let productId = this.props.productId;

    //UPDATE ANSWER HELPFUL COUNTER
    if (!this.state.isHelpful) {
      this.props.clickOnHelpfulAnswer(answerId, productId);
      this.setState({
        isHelpful: true
      });

    } else {
      console.log ('you\'ve alredy clicked on helpful link');
    }
  }

  reportAnswer() {
    let answerId = this.props.answer.id;
    let productId = this.props.productId;

    if (!this.state.isReported) {
      this.props.reportAnswer(answerId, productId);
      this.setState({
        isReported: true
      });

    } else {
      alert('you\'ve already reported this answer');
    }

  }

  render() {
    var report;
    // let photoLink;
    // if (this.props.answer.photos.length > 0) {
    //   for (var i = 0; i < this.props.answer.photos.length; i++) {
    //     photoLink = <img src={this.props.answer.photos[i]} width='300' height='200'></img>;
    //     console.log('i', i);
    //     console.log('photoLink', this.props.answer.photos[i]);
    //   }
    // } else {
    //   photoLink = <div></div>;
    // }


    if (this.state.isReported) {
      report = <div>Reported</div>;
    } else {
      report = <div>Report</div>;
    }

    return (
      <div className='qna-answer-item-wrapper'>

        <div className='qna-answer-item-body'>A:{this.props.answer.body}</div>
        <div className='qna-answer-photo-upload'>{this.props.answer.photos.length > 0 &&
          this.props.answer.photos.map((item, index) => {
            return (
              <div key={item}>
                <img src={item} alt='' width={'350px'} />
              </div>
            );
          })
        }</div>
        <div className='qna-anwer-links'>
          <div className='qna-answer-item-username'>By user {this.props.answer.answerer_name}</div><div className='answer-item-date'>{moment(this.props.answer.date).format('MMMM DD, YYYY')};</div>
          <div className='qna-answer-item-helpful-keyword'>Helpful?</div>
          <div className='qna-answer-item-yes-button' onClick={()=>{ this.clickOnYes(); }}><u>Yes({this.props.answer.helpfulness})</u></div>
          <div className='qna-answer-item-report-button' onClick={()=> { this.reportAnswer(); }}><u>{report}</u></div>
        </div>
        <div className='qna-answer-item-photos'></div>
      </div>
    );
  }
}

export default QuestionsListItemAnswer;