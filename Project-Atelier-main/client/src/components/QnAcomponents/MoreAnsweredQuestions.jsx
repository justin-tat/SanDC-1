import React from 'react';

const MoreAnsweredQuestions = (props) => {

  return (
    <button className='more-answered-questions-button' onClick = {() => props.click()}>MORE ANSWERED QUESTIONS</button>
  );
};

export default MoreAnsweredQuestions;