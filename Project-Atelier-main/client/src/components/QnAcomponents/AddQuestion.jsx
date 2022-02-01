import React from 'react';
import AddQuestionForm from './AddQuestionForm.jsx';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShown: false,
      isAddButtonShown: true,
      productId: this.props.productId
    };
    this.clickOnAddQuestion = this.clickOnAddQuestion.bind(this);
    this.closeForm = this.closeForm.bind(this);

  }

  clickOnAddQuestion() {
    this.setState({
      isModalShown: true,
      isAddButtonShown: false
    });
    this.props.checkForm();
  }

  closeForm() {
    console.log('close form is triggered');
    this.setState({
      isModalShown: false,
      isAddButtonShown: true
    });
  }


  render() {
    let qnaAskQuestionModal,
      questionButton;
    if (this.state.isModalShown) {
      qnaAskQuestionModal = 'qna-ask-question-modal-shown';
    } else {
      qnaAskQuestionModal = 'qna-ask-question-modal-hidden';
    }
    // let modal,

    // if (this.state.isModalShown) {
    //   modal = <div></div>;
    // } else {
    //   modal = <div></div>;
    // }
    if (this.state.isAddButtonShown) {
      questionButton = <button className='qna-add-question-button' onClick={()=>this.clickOnAddQuestion()}>ADD A QUESTION</button>;
    } else {
      questionButton = <div></div>;
    }
    return (
      <div className='add-question-parent'>
        {questionButton}
        <div className={qnaAskQuestionModal}><AddQuestionForm
          name={this.props.name}
          productId={this.props.productId}
          addQuestion={this.props.addQuestion}
          closeForm={this.closeForm}
        />
        </div>
      </div>
    );
  }
}

export default AddQuestion;