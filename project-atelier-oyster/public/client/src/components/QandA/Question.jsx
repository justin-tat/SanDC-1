import React from 'react';
import Answer from './Answer.jsx';
import AddAnswer from './AddAnswer.jsx';
import axios from 'axios';

const Question = (props) => {

  let markHelpful = (e) => {
    props.clickTracker('Mark Question Helpful', 'Question.jsx');
    let id = e.target.id;
    if (props.state[id] !== true) {
      axios.post('/markQHelpful', {data: {id: id}})
      .then((result) => {
        props.wasMarked(e);
        props.update(props.productId, 1, 100);
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }

  let eachQuestion = props.props.map((item) => {
    return (
      <div key={item.question_id}>
        <span className='question' >Q:{item.question_body}</span> <span className='helpful'>Helpful? <span className='yes' id={item.question_id} onClick={markHelpful}>Yes ({item.question_helpfulness})</span> | <AddAnswer id={item.question_id} clickTracker={props.clickTracker}/></span><br></br>
        <Answer props ={item} clickTracker={props.clickTracker}/>
      </div>
    )
  })

  return (
    <div className='questions'>
      {eachQuestion}
    </div>
  )
}

export default Question;