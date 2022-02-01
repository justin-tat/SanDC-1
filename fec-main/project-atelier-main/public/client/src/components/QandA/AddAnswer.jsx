import React from 'react';
import axios from 'axios';


class AddAnswer extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    show: false
  };
  this.showModal = this.showModal.bind(this);
  this.hideModal = this.hideModal.bind(this);
  this.addAnswer = this.addAnswer.bind(this);
  }

  showModal () {
    this.props.clickTracker('Add Answer Button', 'AddAnswer.jsx');
    this.setState({ show: true })
  }

  hideModal () {
    this.props.clickTracker('Submit Answer Button', 'AddAnswer.jsx');
    this.setState({ show: false })
  }

  addAnswer (e) {
    e.preventDefault();
    let body = e.target[0].value;
    let name = e.target[1].value;
    let email = e.target[2].value;
    let id = this.props.id;

    axios.post(`/addAnswer`, {data: {body: body, name: name, email: email, id: id}})
    .then((result) => {
      console.log('Answer has been added');
    })
    .catch((error) => {
      console.error(error);
    })
    this.hideModal();
  }

  render () {
    if (this.state.show === false) {
      return(
        <span className='addAnswer' onClick={this.showModal}>Add A Answer</span>
      )
     } else {
      return(
        <div className='modalBackground'>
          <div className='modalContainer'>
            <h3>Add Your Answer</h3>
            <form className='newAForm' onSubmit={this.addAnswer}>
              <label className='bodylabel' for='body'>Your Answer</label>
              <input className='bodyInput' type='text' placeholder='Your Answer Here' ref='body' name='body' required></input><br></br>
              <label className='nameLabel' for='name'>What is your nickname</label>
              <input className='nameInput' type='text' placeholder='Example: jack543!' ref='name' name='name' required></input><br></br>
              <div className='nameWarning'>For privacy reasons, do not use your full name or email address</div>
              <label className='emailLabel' for='email'>Your email</label>
              <input className='emailInput' type='email' placeholder='Example: jack@email.com' ref='email' name='email' required></input><br></br>
              <div className='emailWarning'>For authentication reasons, you will not be emailed<br></br>Fields Marked with * are required</div>
              <input type='submit' value='submit'></input>
            </form>
          </div>
        </div>
      )
    }
  };
}

export default AddAnswer;