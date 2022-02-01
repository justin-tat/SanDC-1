import React from 'react';
import axios from 'axios';

class Answer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      haveData: false,
      allADisplayed: false
    }
    this.getMore = this.getMore.bind(this);
    this.getLess = this.getLess.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
    this.report = this.report.bind(this);
    this.wasMarked = this.wasMarked.bind(this);
  }

  getMore (e) {
    this.props.clickTracker('Get more answers button', 'Answer.jsx');
    this.setState({ allADisplayed: true })
  }

  getLess (e) {
    this.props.clickTracker('collapse anwsers button', 'Answer.jsx');
    this.setState({ allADisplayed: false })
  }

  componentDidMount () {
    let id = this.props.props.question_id;
    this.setState({ questionId: id })
    this.getAnswerData(id);
  }

  dateFormat (date) {
    let month = date.slice(5, 7);
    if (month[0] === '0') {
      month = month[1];
    }
    let day = date.slice(8, 10);
    let year = date.slice(0, 4);
    let months = ['shiftingToMatch', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return months[month] + ' ' + day + ', ' + year;
  }

  getAnswerData(id) {
    axios.post(`/getAnswerData`, {data: {id: id}})
    .then((result) => {
      this.setState({
        answerData: result.data.results,
        haveData: true
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }

  markHelpful (e) {
    this.props.clickTracker('Mark Answer Helpful', 'Answer.jsx');
    let id = e.target.id;
    if (this.state[id] !== true) {
      axios('/markAHelpful', {data: {id: id}})
      .then((result) => {
        this.wasMarked(e);
        this.getAnswerData(this.props.props.question_id);
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }

  wasMarked (e) {
    this.setState({ [e.target.id]: true })
  }

  report (e) {
    this.props.clickTracker('Report Answer Button', 'Answer.jsx');
    let id = e.target.id;
    axios.post('/reportAnswer', {data: {id: id}})
    .then((result) => {
      e.target.className = 'reported'
      e.target.innerText = 'Reported'
    })
    .catch((error) => {
      console.error(error);
    })
  }

  render() {
    if (!this.state.haveData) {
      return (
        <div className='loading'>
          Answers are loading
        </div>
      )
    } else if (!this.state.allADisplayed) {
      let eachAnwser = this.state.answerData.slice(0, 2).map((item) => {
        return (
          <span key={item.answer_id} className='answer'>
            {item.body} <br></br>
            by {item.answerer_name === 'Seller' ? <span className='seller'>{item.answerer_name}</span> : <span className='answerer'>{item.answerer_name}</span>}, {this.dateFormat(item.date)} <span className='helpful'>Helpful? <span className='yes' id={item.answer_id} onClick={this.markHelpful}>Yes ({item.helpfulness})</span> | <span className='report' id={item.answer_id} onClick={this.report}>Report</span></span><br></br>
          </span>
        )
      })
      return (
        <div className='answers'>
          <span className='aHeading'>A:</span> {eachAnwser}
          {this.state.answerData.length > 2 && <span className='loadMoreAnswers' onClick={this.getMore}>Load More Answers</span>}<br></br><br></br>
        </div>
      )
    } else {
      let eachAnwser = this.state.answerData.map((item) => {
        return (
          <div key={item.answer_id} className='answer'>
            {item.body} <br></br>
            by {item.answerer_name === 'Seller' ? <span className='seller'>{item.answerer_name}</span> : <span className='answerer'>{item.answerer_name}</span>}, {this.dateFormat(item.date)} <span className='helpful'>Helpful? <span className='yes' id={item.answer_id} onClick={this.markHelpful}>Yes ({item.helpfulness})</span> | <span className='report' id={item.answer_id} onClick={this.report}>Report</span></span><br></br>
          </div>
        )
      })
      return (
        <div className='answers'>
          <span className='aHeading'>A:</span>{eachAnwser} <br></br>
          <span onClick={this.getLess}>Collapse Answers</span><br></br>
        </div>
      )
    }
  }

}

export default Answer;