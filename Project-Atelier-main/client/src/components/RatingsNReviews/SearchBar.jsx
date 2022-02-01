import React, {useState, useEffect} from 'react';

const SearchBar = ({totalReviewArray, setOnScreenReviewArray, searchResult, setSearchResult}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterSearchTerm = function () {
    totalReviewArray.filter((val) => {
      if (searchTerm.length >= 3) {
        if (val.body.toLowerCase().includes(searchTerm.toLowerCase()) || val.summary.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }
    }).map((result, index) => {
      setSearchResult((prevState) => {
        return [...prevState, result];
      });
      console.log('searching result:', result);
      setOnScreenReviewArray(searchResult);
    });
  };
  return (
    <div>
      <input type='text' placeholder='Search...' onChange={(e) => {
        setSearchTerm(e.target.value);
      }}></input>
    </div>
  );
};

export default SearchBar;