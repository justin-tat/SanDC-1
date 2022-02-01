import React from 'react';
import Search from './Search.jsx';
import Questions from './Questions.jsx';
import AddQuestion from './AddQuestion.jsx';
import axios from 'axios';

class QandA extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      haveData: false,
      qToDisplay: 2,
      allQDisplayed: false,
      searchData: '',
      useFiltered: false
    };
    this.moreButton = this.moreButton.bind(this);
    this.getQuestionData = this.getQuestionData.bind(this);
    this.searchBarChange = this.searchBarChange.bind(this);
    this.filterQuestionData = this.filterQuestionData.bind(this);
  }

  searchBarChange (e) {
    this.setState({ searchData: e.target.value }, () => {
      if (this.state.searchData.length > 2) {
        this.setState({useFiltered: true})
        this.filterQuestionData(this.state.searchData);
      } else {
        this.setState({
          slicedData: this.state.questionData.slice(0, this.state.qToDisplay),
          allQDisplayed: false,
          useFiltered: false
        });
      }
    })
  }

  filterQuestionData (data) {
    if (this.state.searchData !== '') {
      let searchTerm = data.toLowerCase().split(' ');
      let filteredData = [];
      let checker = (apiData, searchTerms) => searchTerms.every(element => apiData.includes(element));

      for (let i = 0; i < this.state.questionData.length; i++) {
        let currentBody = this.state.questionData[i].question_body.toLowerCase().split(' ');
        let flag = checker(currentBody, searchTerm);
        if (flag) {
          filteredData.push(this.state.questionData[i]);
        }
      }
      this.setState({
        filteredData: filteredData,
        slicedData: filteredData.slice(0, this.state.qToDisplay)
      });
    } else {
      this.setState({filteredData: [], allQDisplayed: false});
    }
  }

  moreButton (e) {
    this.props.clickTracker('More Questions Button', 'QandA.jsx');
    let newSlice = this.state.qToDisplay + 2;
    if (!this.state.useFiltered) {
      if (newSlice >= this.state.questionData.length) {
        this.setState({
          allQDisplayed: true
        })
      }
      this.setState({
        qToDisplay: newSlice,
        slicedData: this.state.questionData.slice(0, newSlice)
      })
    } else {
      if (newSlice >= this.state.filteredData.length) {
        this.setState({
          allQDisplayed: true
        })
      }
      this.setState({
        qToDisplay: newSlice,
        slicedData: this.state.filteredData.slice(0, newSlice)
      })
    }
  }

  componentDidMount () {
    let id = this.props.id;
    this.setState({ id: id })
    this.getQuestionData(id, 1, 100)
  }

  componentDidUpdate(prevProps) {
    if(this.props.id !== prevProps.id) {
      this.setState({
        id: this.props.id
      })
      this.getQuestionData(this.props.id, 1, 100)
    }
  }

  getQuestionData (id, page, count) {
    axios.post('/questionAndAnswers', {data: {id: id, page: page, count: count}})
    .then((result) => {
      this.setState({
        questionData: result.data.results,
        slicedData: result.data.results.slice(0, this.state.qToDisplay),
        haveData: true,
        allQDisplayed: false
      })
    })
  }

  render() {
    if (!this.state.haveData) {
      return (
        <div>
          <h3>QUESTIONS & ANSWERS</h3>
          <p>Questions are Loading</p>
        </div>
        )
      } else if (this.state.questionData.length === 0) {
        return (
          <div>
          <h3>QUESTIONS & ANSWERS</h3>
          <AddQuestion clickTracker={this.props.clickTracker}/>
          </div>
        )
      } else {
        return (
          <div className='qAndA'>
        <h3>QUESTIONS & ANSWERS</h3>
        <Search searchBarChange={this.searchBarChange} clickTracker={this.props.clickTracker}/>
        <Questions questions={this.state.slicedData} moreButton={this.moreButton} update={this.getQuestionData} productId={this.state.id} searchData={this.state.searchData} clickTracker={this.props.clickTracker}/>
        {!this.state.allQDisplayed && <span className='moreQuestion' id='MoreQuestion' onClick={this.moreButton}>More Anwsered Questions </span>}
        <AddQuestion id ={this.props.id} update={this.getQuestionData} clickTracker={this.props.clickTracker}/> <br></br>
        </div>
      )
    }
  }
}

export default QandA;