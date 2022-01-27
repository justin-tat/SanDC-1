import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  //method to filter questions on change of text in the search bar with 3 or more characters
  onChangeFilter(event) {
    var questionsOnDOM = document.getElementsByClassName('QuestionComponent');
    var noResultsElement = document.getElementsByClassName('resultNotFound')[0];
    var resultFound = false;

    if (event.target.value.length >= 3) {

      for (var question = 0; question < questionsOnDOM.length; question++) {
        if (questionsOnDOM[question].children[0].textContent.includes(event.target.value)) {
          if (questionsOnDOM[question].classList.contains('moreQuestions')) {
            questionsOnDOM[question].classList.remove('moreQuestions');
          }
          resultFound = true;
        } else {
          questionsOnDOM[question].classList.add('moreQuestions');
        }
      }

      if (!resultFound) {
        noResultsElement.style.visibility = 'visible';
      } else {
        noResultsElement.style.visibility = 'hidden';
      }
    } else {
      for (var question = 0; question < 2; question++) {
        if(questionsOnDOM[question] !== undefined) {
          questionsOnDOM[question].classList.remove('moreQuestions');
        }
      }
      noResultsElement.style.visibility = 'hidden';
    }
  }

  render() {
    return (
      <div className='searchBarDiv'>
        <input className='searchBar' type='text' placeholder='Have a question? Search for answers…'
        onClick={ (event) => { this.props.trackClicks(event, 'Questions & Answers'); }}
        onChange={ (event) => { this.onChangeFilter(event) }}></input>
        <p className='resultNotFound'>No Results</p>
      </div>
    )
  }
}

export default SearchBar;