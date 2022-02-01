import React from 'react';
import axios from 'axios';

class AddQuestion extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    show: false
  };
  this.showModal = this.showModal.bind(this);
  this.hideModal = this.hideModal.bind(this);
  this.addQuestion = this.addQuestion.bind(this);
  }

  showModal (e) {
    this.props.clickTracker('Add Question Button', 'AddQuestion.jsx');
    this.setState({ show: true })
  }

  hideModal (e) {
    this.props.clickTracker('Submit Question Button', 'AddQuestion.jsx');
    this.setState({ show: false })
  }

  addQuestion (e) {
    e.preventDefault();
    let body = e.target[0].value;
    let name = e.target[1].value;
    let email = e.target[2].value;
    let id = this.props.id;

    axios.post(`/addQuestion`, {data: {body: body, name: name, email: email, product_id: id}})
    .then((result) => {
      console.log('Question was added');
      this.props.update(id, 1, 100);
    })
    .catch((error) => {
      console.error(error);
    })
    this.hideModal();
  }

  render () {
    if (this.state.show === false) {
      return(
        <span className='addQuestion stuff' onClick={this.showModal}>Add A Question +</span>
      )
    } else {
      return(
        <div className='modalBackground'>
          <div className='modalContainer'>
            <h3>Add Your Question</h3>
            <form className='newQForm' onSubmit={this.addQuestion}>
              <label className='bodylabel' for='body'>Your Question*</label>
              <input className='bodyInput' type='text' placeholder='Your Question Here' ref='body' name='body' required></input><br></br>
              <label className='nameLabel' for='name'>What is your nickname*</label>
              <input className='nameInput' type='text' placeholder='Example: jackson11!' ref='name' name='name' required></input><br></br>
              <div className='nameWarning'>For privacy reasons, do not use your full name or email address</div>
              <label className='emailLabel' for='email'>Your email*</label>
              <input className='emailInput' type='email' placeholder='Why did you like the product of not?' ref='email' name='email' required></input><br></br>
              <div className='emailWarning'>For authentication reasons, you will not be emailed<br></br>Fields marked with * are erquired</div>
              <input type='submit' value='submit'></input>
            </form>
          </div>
        </div>
      )
    }
  };
}

export default AddQuestion;