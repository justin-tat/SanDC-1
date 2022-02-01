import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
  }

  //method to get answers list for particular questions id passed through props
  componentDidMount() {
    //make call to api for list using question id
    axios.get(this.props.apiUrl + '/qa/questions/' + this.props.id + '/answers', {
      headers: {
        'Authorization': this.props.token
      },
      params: {
        question_id: this.props.id
      }
    }).then((results) => {
      //save answers list to state
      var answersSorted = results.data.results.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });
      var finalAnswers = [];

      for (var currentAnswer = 0; currentAnswer < answersSorted.length; currentAnswer++) {
        if (answersSorted[currentAnswer].answerer_name === 'Seller') {
          finalAnswers.push(answersSorted[currentAnswer]);
        }
      }

      for (var currentAnswer = 0; currentAnswer < answersSorted.length; currentAnswer++) {
        if (answersSorted[currentAnswer].answerer_name !== 'Seller') {
          finalAnswers.push(answersSorted[currentAnswer]);
        }
      }

      this.setState({ answers: finalAnswers });
    }).catch((err) => { console.log('Error getting answers from API: ' + err) });
  }

  //method for click of "See More Answers" button to make more answers visible
  showMoreAnswers() {
    var hiddenAnswers = document.getElementsByClassName('moreAnswers');
    var allAnswers = document.getElementsByClassName('answersListItem');
    var answersButton = document.getElementsByClassName('moreAnswersButton')[0];

    if (answersButton.textContent === 'See More Answers') {
      for (var currentElement = 0; currentElement < hiddenAnswers.length; currentElement + 1) {
        if (hiddenAnswers[currentElement] !== undefined) {
          hiddenAnswers[currentElement].classList.remove('moreAnswers');
        }
      }
      answersButton.innerText = 'Collapse Answers';
    } else {
      for (var currentElement = 2; currentElement < allAnswers.length; currentElement++) {
        if (allAnswers[currentElement] !== undefined) {
          allAnswers[currentElement].classList.add('moreAnswers');
        }
      }
      answersButton.innerText = 'See More Answers';
    }
  }

  answerYesLinkPut(id) {
    axios.put(this.props.apiUrl + '/qa/answers/' + id + '/helpful', {
      headers: {
        'Authorization': this.props.token
      },
      params: {
        answer_id: id
      }
    }).then(() => {
      console.log('Successfully posted answer helpfulness');
    }).catch((err) => {
      console.log('Error posting answer helpfulness: ' + err);
    })
  }

  reportAnswerPut(id) {
    axios.put(this.props.apiUrl + '/qa/answers/' + id + '/report', {
      headers: {
        'Authorization': this.props.token
      },
      params: {
        answer_id: id
      }
    }).then(() => {
      console.log('Successfully reported answer');
    }).catch((err) => {
      console.log('Error reporting answer: ' + err);
    })
  }

    render() {
      if (this.state.answers.length > 2) {
        var moreAnswersButton = <button className='moreAnswersButton' onClick={(event) => {
          this.props.trackClicks(event, 'Questions & Answers');
          this.showMoreAnswers();
        }}>See More Answers</button>
      }
      return (
        <div className='AnswersListComponent'>
          <h2>A: </h2>
          <ol className='listOfAnswers'>
            {
              this.state.answers.map((answer, index) => {
                var months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
                var monthNumber = Number(answer.date.slice(5, 7));
                var monthName = months[monthNumber - 1];
                var year = answer.date.slice(0, 4);
                var day = answer.date.slice(8, 10);
                var answerer;

                if (answer.answerer_name === 'Seller') {
                  answerer = <p className='seller'>by {answer.answerer_name}, </p>
                } else {
                  answerer = <p className='QandAby'>by {answer.answerer_name}, </p>
                }

                if (answer.photos.length > 0) {
                  return <li className={index > 1 ? 'answersListItem moreAnswers' : 'answersListItem'} key={index}>
                    <p className='QandAAnswerBody'>{answer.body}</p>
                    {
                      answer.photos.map((photo, index) => {
                        return <img key={index} alt={answer.body} className='QandAAnswerPhoto' src={photo.url} />
                      })
                    }
                    {answerer}
                    <p className='timeAnswered'>{monthName + ' ' + day + ', ' + year}</p>
                    <p className='helpfulLineAnswer'> | </p>
                    <p className='QandAHelpfulAnswer'>Helpful? </p>
                    <p className='QandAyesAnswer' onClick={(event) => {
                      this.props.trackClicks(event, 'Questions & Answers');
                      event.target.textContent = `Yes (${answer.helpfulness + 1})`;
                      this.answerYesLinkPut(answer.answer_id);
                    }}>Yes ({answer.helpfulness})</p>
                    <p className='helpfulLineAnswer'> | </p>
                    <p className='QandAReportAnswer' onClick={(event) => {
                      this.props.trackClicks(event, 'Questions & Answers');
                      event.target.textContent = 'Reported';
                      event.target.style.cursor = 'default';
                      event.target.style.opacity = 0.5;
                      event.target.style['text-decoration'] = 'none';
                      this.reportAnswerPut(answer.answer_id);
                    }}>Report</p>
                    <br></br>
                  </li>
                } else {
                  return <li className={index > 1 ? 'answersListItem moreAnswers' : 'answersListItem'} key={index}>
                    <p className='QandAAnswerBody'>{answer.body}</p>
                    {answerer}
                    <p className='timeAnswered'>{monthName + ' ' + day + ', ' + year}</p>
                    <p className='helpfulLineAnswer'> | </p>
                    <p className='QandAHelpfulAnswer'>Helpful? </p>
                    <p className='QandAyesAnswer' onClick={(event) => {
                      this.props.trackClicks(event, 'Questions & Answers');
                      event.target.textContent = `Yes (${answer.helpfulness + 1})`;
                      this.answerYesLinkPut(answer.answer_id);
                    }}>Yes ({answer.helpfulness})</p>
                    <p className='helpfulLineAnswer'> | </p>
                    <p className='QandAReportAnswer' onClick={(event) => {
                      this.props.trackClicks(event, 'Questions & Answers');
                      event.target.textContent = 'Reported';
                      event.target.style.cursor = 'default';
                      event.target.style.opacity = 0.5;
                      event.target.style['text-decoration'] = 'none';
                      this.reportAnswerPut(answer.answer_id);
                    }}>Report</p>
                    <br></br>
                  </li>
                }
              })
            }
          </ol>
          {moreAnswersButton}
        </div>
      )
    }
  }

export default AnswersList;