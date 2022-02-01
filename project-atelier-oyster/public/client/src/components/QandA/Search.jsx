import React from 'react';

const Search = (props) => {
  //console.log('here', props);
  //let clicktracker = props.clickTracker('Search Bar', 'Search.jsx');
  return (
    <form onChange={props.searchBarChange} >
      <input type='text' id='search' size='50' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
    </form>
  )
};

export default Search;