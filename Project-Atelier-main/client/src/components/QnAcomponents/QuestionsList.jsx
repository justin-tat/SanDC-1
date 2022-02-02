import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var data = [];
    data = [...this.props.data];
    data.sort(((a, b) => {
      return b.helpfulness - a.helpfulness;
    }));

  

    return (
      <div>
        {/* {console.log('questions', this.props.data)} */}
        {data.map((question, key) =>{
          return <QuestionsListItem
            question={question}
            key={key}
            name={this.props.name}
            productId={this.props.productId}
            clickOnHelpful={this.props.clickOnHelpful}
            clickOnHelpfulAnswer={this.props.clickOnHelpfulAnswer}
            reportAnswer={this.props.reportAnswer}
            addNewAnswer={this.props.addNewAnswer}
            productName={this.props.productName}
          />;
        })}
      </div>
    );
  }
}

export default QuestionsList;