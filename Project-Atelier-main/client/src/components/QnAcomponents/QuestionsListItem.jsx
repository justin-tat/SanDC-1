import React from 'react';
import QuestionsListItemAnswer from './QuestionsListItemAnswer.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';
import AnswersList from './AnswersList.jsx';
import axios from 'axios';

class QuestionsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddAnswerClicked: false,
      answers: {},
      isMoreAnswersShown: false,
      isHelpful: false,
      buttonText: 'SHOW MORE ANSWERS',
      questionId: 0
    };
    this.clickOnMoreAnswers = this.clickOnMoreAnswers.bind(this);
    this.addAnswerHandleClick = this.addAnswerHandleClick.bind(this);
    this.clickOnHelpful = this.clickOnHelpful.bind(this);
    this.closeAnswerForm = this.closeAnswerForm.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.question.question_id !== this.props.question.question_id) {
  //     console.log('question item updated');
  //     let answersToShow = Object.values(this.props.question.answers);
  //     if (answersToShow.length > 2) {
  //       this.setState({
  //         isMoreAnswersShown: true
  //       });
  //     }
  //     answersToShow = answersToShow.slice(0, 2);
  //     this.setState({
  //       answers: answersToShow
  //     });
  //   }
  // }

  componentDidMount() {

    let answersToShow = Object.values(this.props.question.answers);
    if (answersToShow.length > 2) {
      this.setState({
        isMoreAnswersShown: true
      });
    }
    answersToShow = answersToShow.slice(0, 2);
    this.setState({
      answers: answersToShow
    });
  }

  clickOnMoreAnswers() {
    if (this.state.buttonText === 'SHOW MORE ANSWERS') {
      this.setState({
        buttonText: 'COLLAPSE ANSWERS'
      });
    } else {
      this.setState({
        buttonText: 'SHOW MORE ANSWERS'
      });
    }
  }

  addAnswerHandleClick(event) {
    //event.stopPropagation();
    //console.log('should be triggered once');
    this.setState({
      isAddAnswerClicked: true
    });
  }

  closeAnswerForm() {
    //console.log('triggered close answer');
    //console.log('before triggering closing', this.state);

    this.setState((prevState) => {
      //console.log(prevState);
      return {
        isAddAnswerClicked: false
      };
    }, () => {
      //console.log('updated', this.state);
    });
  }

  clickOnHelpful() {
    let questionId = this.props.question.question_id;
    let productId = this.props.productId;

    //ADD HELPFULLNESS FOR THIS QUESTION
    if (!this.state.isHelpful) {
      this.props.clickOnHelpful(productId, questionId);
    } else {
      alert ('you\'ve already clicked on helpful link');
    }

  }

  render() {

    let moreAnswers,
      addAnswer,
      answersList,
      qnaAddAnswerModal,
      answerItems;

    if (this.state.buttonText === 'COLLAPSE ANSWERS') {
      answerItems = Object.values(this.props.question.answers);

    } else {
      answerItems = Object.values(this.props.question.answers).slice(0, 2);

    }

    if (this.state.isAddAnswerClicked) {
      qnaAddAnswerModal = 'qna-add-answer-modal-shown';
    } else {
      qnaAddAnswerModal = 'qna-add-answer-modal-hidden';
    }

    if (Object.values(this.props.question.answers).length > 2) {
      moreAnswers = <button id='qna-more-answers-button' onClick={()=>{ this.clickOnMoreAnswers(); }}>{this.state.buttonText}</button>;
      answersList = <AnswersList list={answerItems}
        questionId={this.props.question.question_id}
        productId={this.props.productId}
        clickOnHelpfulAnswer={this.props.clickOnHelpfulAnswer}
        reportAnswer={this.props.reportAnswer}
      />;

    } else {
      moreAnswers = <div></div>;
      answersList = <AnswersList list={answerItems}
        questionId={this.props.question.question_id}
        productId={this.props.productId}
        clickOnHelpfulAnswer={this.props.clickOnHelpfulAnswer}
        reportAnswer={this.props.reportAnswer}
      />;

    }



    return (
      <div>
        <div className='qna-question-item-wrap'>

          {/* beginning of question item */}
          <div className='qna-question-q-letter-body-wrapper'>
            <div className='qna-question-body'>Q: {this.props.question.question_body}</div>
          </div>
          <div className='qna-question-links'>
            <div className='qna-question-item-helpful-keyword' >Helpful?</div>
            <div className='qna-question-item-yes-button' onClick={()=>{ this.clickOnHelpful(); }}><u>Yes</u>({this.props.question.question_helpfulness})</div>
            <div className='qna-question-item-answer-border'>|</div>
            <div className='qna-add-answer-link' onClick={(e)=> this.addAnswerHandleClick(e)}>Add answer</div>
            <div className={qnaAddAnswerModal}>
              <AddAnswerForm name={this.props.name}
                question_body={this.props.question.question_body}
                questionId={this.props.question.question_id}
                productId={this.props.productId}
                closeAnswer={this.closeAnswerForm}
                addNewAnswer={this.props.addNewAnswer}
                productName={this.props.productName}

              />;
            </div>
          </div>
        </div>
        {/* end of question item */}
        <div className='qna-answer-list'>{answersList}</div>

        {moreAnswers}

      </div>
    );


  }




}

export default QuestionsListItem;