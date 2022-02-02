import React from 'react';

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    let query = event.target.value;
    if (query.length >= 3) {
      this.props.search(query, true);
    } else {
      this.props.search(query, false);
    }


  }

  render() {
    return (
      <div className='qna-search-wrapper'>
        {/* <img className='qna-search-icon' src='https://www.clipartmax.com/png/full/213-2137376_search-vector-art-icon-small-search-icon-png.png'/> */}
        <form>
          <input
            className='qna-search-input'
            type='text'
            placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS…'
            // size='50'
            // value=''
            onChange={(e)=>this.handleInputChange(e)} />
        </form>
      </div>
    );
  }

}

export default SearchQuestions;