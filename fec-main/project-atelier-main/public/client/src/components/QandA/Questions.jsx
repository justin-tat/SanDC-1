import React from 'react';
import Question from './Question.jsx';
import axios from 'axios';


class Questions extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      qToDisplay: 2,
      showAll: false
    }
    this.wasMarked =this.wasMarked.bind(this);
  }

  wasMarked (e) {
    this.setState({
      [e.target.id]: true
    })
  }

  render() {
    let questions = this.props.questions;
    if (!this.props.questions) {
      return (
        <div>
          Questions are loading
        </div>
      )
    } else {
    return (
      <div key={this.props.questions.length} className='questions'>
        <Question props={questions} moreButton={this.props.moreButton} update={this.props.update} productId={this.props.productId} searchData={this.props.searchData} wasMarked={this.wasMarked} state={this.state} clickTracker={this.props.clickTracker}/>
      </div>
    )
    }
  }
}

export default Questions;