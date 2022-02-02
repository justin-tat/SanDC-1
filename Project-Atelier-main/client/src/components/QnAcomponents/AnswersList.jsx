import React from 'react';
import QuestionsListItemAnswer from './QuestionsListItemAnswer.jsx';

const AnswersList = (props) => {
  var list = [];
  list = [...props.list];
  list.sort(((a, b) => {
    return b.helpfulness - a.helpfulness;
  }));

  return (
    <div>
      {list.map((answer, key) => {
        return (
          <QuestionsListItemAnswer answer={answer}
            key={key}
            questionId={props.question_id}
            productId={props.productId}
            clickOnHelpfulAnswer={props.clickOnHelpfulAnswer}
            reportAnswer={props.reportAnswer}
          />);
      })}
    </div>
  );
};





export default AnswersList;

