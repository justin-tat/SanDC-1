import React, {useState, useEffect, useRef} from 'react';
import RatingBreakDown from './RatingBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import axios from 'axios';
import HelpfulButton from './HelpfulButton.jsx';
import ReviewBody from './ReviewBody.jsx';

import NewReview from './NewReview.jsx';
import SearchBar from './SearchBar.jsx';
import ClickedData from '../ClickDataAnalytics.jsx';

const ReviewList = ( { handleAverageRate, handleReviews, onClick, productId, currentProduct } )=>{
  const [selectedArray, setSelectedArray] = useState('totalReviewArray');
  const [isOpen, setIsOpen] = useState(false);
  const [totalReviewArray, setTotalReviewArray] = useState([]);
  const [helpfulReviewArray, setHelpfulReviewArray] = useState([]);
  const [newestReviewArray, setNewestReviewArray] = useState([]);
  const [onScreenReviewArray, setOnScreenReviewArray] = useState([]);
  const [clickedList, setClickedList] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [averageRate, setAverageRate] = useState('');
  const [recommended, setRecommended] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [fiveStar, setFiveStar] = useState(0);
  const [characteristics, setCharacteristics] = useState(null);
  const [filter, setFilter] = useState(new Array(5).fill(null));
  const [filterClicked, setFilterClicked] = useState(false);
  const [sortedArray, setSortedArray] = useState([]);
  const [reset, setReset] = useState(false);
  const [count, setCount] = useState(0);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const arrayMap =
   { totalReviewArray: totalReviewArray,
     helpfulReviewArray: helpfulReviewArray,
     newestReviewArray: newestReviewArray,
     sortedArray: sortedArray,
     resetArray: totalReviewArray
   };
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setSortedArray([]);
    setFilter(new Array(5).fill(null));
    setIsPost(false);
    axios.get('/ratings/getReviews', { params: { Id: productId } })
      .then((response)=>{
        if (mounted) {
          const sortByRevelant = response.data.slice(0).sort((x, y) => { return y.helpfulness - x.helpfulness || y.review_id - x.review_id; });
          const firstTwo = sortByRevelant.slice(0, 2);
          let searchBarResult;
          if (selectedArray === 'resetArray') {
            if (searchTerm.length >= 3) {
              searchBarResult = searching(searchTerm, sortByRevelant);
              setOnScreenReviewArray(searchBarResult);
            } else {
              setOnScreenReviewArray(sortByRevelant);
            }
            setIsLoading(false);
          }
          if (selectedArray === 'totalReviewArray') {
            if (searchTerm.length >= 3) {
              searchBarResult = searching(searchTerm, sortByRevelant);
              setOnScreenReviewArray(searchBarResult);
            } else {
              setOnScreenReviewArray(firstTwo);
            }
            setIsLoading(false);
          } else if (selectedArray === 'newestReviewArray') {
            if (searchTerm.length >= 3) {
              searchBarResult = searching(searchTerm, sortByRevelant);
              setOnScreenReviewArray(searchBarResult.slice(0).sort((x, y)=>{ return y.review_id - x.review_id; }).slice(0));
            } else {
              setOnScreenReviewArray(response.data.slice(0).sort((x, y)=>{ return y.review_id - x.review_id; }).slice(0, 2));
            }
            setIsLoading(false);
          } else if (selectedArray === 'helpfulReviewArray') {
            if (searchTerm.length >= 3) {
              searchBarResult = searching(searchTerm, sortByRevelant);
              setOnScreenReviewArray(searchBarResult.slice(0).sort((x, y)=>{ return y.helpfulness - x.helpfulness; }).slice(0));
            } else {
              setOnScreenReviewArray(response.data.slice(0).sort((x, y)=>{ return y.helpfulness - x.helpfulness; }).slice(0, 2));
            }
            setIsLoading(false);
          }
          handleReviews(sortByRevelant.length);
          setTotalReviewArray(sortByRevelant);
          setNewestReviewArray(response.data.slice(0).sort((x, y)=>{ return y.review_id - x.review_id; }));
          setHelpfulReviewArray(response.data.slice(0).sort((x, y)=>{ return y.helpfulness - x.helpfulness; }));
          axios.get('ratings/ratingOverview', { params: { Id: productId } })
            .then((response)=>{
              if (mounted) {
                setAverageRate(response.data.ratings.average);
                handleAverageRate(response.data.ratings.average);
                setRecommended(response.data.recommended);
                setOneStar(response.data.ratings['1']);
                setTwoStar(response.data.ratings['2']);
                setThreeStar(response.data.ratings['3']);
                setFourStar(response.data.ratings['4']);
                setFiveStar(response.data.ratings['5']);
                setCharacteristics(response.data.characteristics);
              }
            });
        }
      })
      .catch((err) => {
        console.log('this is the react reviewlist get reviews err', err);
      });

    return () => {
      mounted = false;
    };
  }, [productId, selectedArray, isPost]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let currentFilter = sortFilter()[0];
      let flag = sortFilter()[1];
      if (currentFilter.length) {
        setOnScreenReviewArray(currentFilter.slice(0));
        setSortedArray(currentFilter.slice(0));
      } else if (reset) {
        setSortedArray([]);
        if (searchResult.length || searchTerm.length >= 3) {
          setOnScreenReviewArray(searchResult.slice(0));
        } else {
          setOnScreenReviewArray(totalReviewArray.slice(0, 2));
        }
      } else if (searchTerm.length >= 3 && searchResult.length && !flag) {
        setSortedArray([]);
        setOnScreenReviewArray(searchResult.slice(0));
      } else {
        setSortedArray([]);
        if (searchTerm.length >= 3 || flag) {
          setOnScreenReviewArray(currentFilter.slice(0));
        } else {
          setOnScreenReviewArray(totalReviewArray.slice(0));
        }
      }
      setFilterClicked(flag);
    }
    return () => {
      mounted = false;
    };
  }, [filter]);
  const resetFilter = function () {
    if (sortedArray.length) {
      setReset(true);
      setFilter(new Array(5).fill(null));
      let dropDownList = document.getElementById('review-sort-select');
      setSelectedArray('totalReviewArray');
      dropDownList.value = 'totalReviewArray';
    }
    return;
  };
  const sortFilter = function () {
    let currentFilter = [];
    let count = 0;
    let flag = false;
    for (let i = filter.length - 1; i >= 0; i--) {
      if (filter[i] !== null) {
        count++;
        flag = true;
        currentFilter = currentFilter.concat(filter[i]);
      }
    }
    setCount(count);
    return [currentFilter, flag];
  };
  const searching = function (term, updatedArray) {
    updatedArray = updatedArray || arrayMap[selectedArray];
    let searchingResult = [];
    setSearchResult([]);
    if (term.length < 3 ) {
      setFilter(new Array(5).fill(null));
      return;
    }
    updatedArray.filter((val) => {
      if (!(val.body.toLowerCase().includes(term.toLowerCase()) || val.summary.toLowerCase().includes(term.toLowerCase()))) {
        setFilter(new Array(5).fill(null));
        setSearchResult([]);
        setOnScreenReviewArray(searchingResult);
      } else {
        return val;
      }
    }).map((result, index) => {
      searchingResult.push(result);
      setSearchResult(searchingResult);
      setOnScreenReviewArray(searchingResult);
    });
    return searchingResult;
  };
  const filterOnClicked = function (e) {
    let onClickedFilter = e.target.id;
    let updatedFilter = [...filter];
    if (searchTerm.length >= 3 && !searchResult.length) {
      return;
    } else if (onClickedFilter === 'fiveStar') {
      if (filter[4] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('resetArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[4] = null;
      } else {
        let fiveStarOnly;
        if (searchResult.length) {
          fiveStarOnly = searchResult.filter((e) => { return e.rating === 5; });
        } else {
          fiveStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 5; });
        }
        updatedFilter[4] = fiveStarOnly;
      }
      setFilter(updatedFilter);
    } else if (onClickedFilter === 'fourStar') {
      if (filter[3] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('resetArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[3] = null;
      } else {
        let fourStarOnly;
        if (searchResult.length) {
          fourStarOnly = searchResult.filter((e) => { return e.rating === 4; });
        } else {
          fourStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 4; });
        }
        updatedFilter[3] = fourStarOnly;
      }
      setFilter(updatedFilter);
    } else if (onClickedFilter === 'threeStar') {
      if (filter[2] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('resetArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[2] = null;
      } else {
        let threeStarOnly;
        if (searchResult.length) {
          threeStarOnly = searchResult.filter((e) => { return e.rating === 3; });
        } else {
          threeStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 3; });
        }
        updatedFilter[2] = threeStarOnly;
      }
      setFilter(updatedFilter);
    } else if (onClickedFilter === 'twoStar') {
      if (filter[1] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('resetArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[1] = null;
      } else {
        let twoStarOnly;
        if (searchResult.length) {
          twoStarOnly = searchResult.filter((e) => { return e.rating === 2; });
        } else {
          twoStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 2; });
        }
        updatedFilter[1] = twoStarOnly;
      }
      setFilter(updatedFilter);
    } else if (onClickedFilter === 'oneStar') {
      if (filter[0] !== null) {
        if (count === 1) {
          let dropDownList = document.getElementById('review-sort-select');
          setSelectedArray('resetArray');
          dropDownList.value = 'totalReviewArray';
        }
        updatedFilter[0] = null;
      } else {
        let oneStarOnly;
        if (searchResult.length) {
          oneStarOnly = searchResult.filter((e) => { return e.rating === 1; });
        } else {
          oneStarOnly = arrayMap[selectedArray].filter((e) => { return e.rating === 1; });
        }
        updatedFilter[0] = oneStarOnly;
      }
      setFilter(updatedFilter);
    }
  };
  const convertDate = function (dateString) {
    dateString = dateString.slice(0, dateString.length - 1 );
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const loadReviews = function (selectedArray) {
    selectedArray = (sortedArray.length ? sortedArray : arrayMap[selectedArray]);
    let startIndex = onScreenReviewArray.length;
    for (let i = startIndex; i <= startIndex + 1; i++) {
      if (i === selectedArray.length) {
        break;
      } else {
        setOnScreenReviewArray((prevState) => {
          return prevState.concat(selectedArray[i]);
        });
      }
    }
  };
  const openModal = function (e) {
    var modal = document.getElementById('review-Modal');
    var img = document.getElementById('review-Images');
    var modalImg = document.getElementById('review-Modal-Content');
    modal.style.display = 'block';
    modalImg.src = e.target.src;
    modalImg.alt = e.target.alt;
  };
  const closeModal = function (e) {
    var modal = document.getElementById('review-Modal');
    modal.style.display = 'none';
  };
  const starWidth = function (rating) {
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = (starPercentage / 10) * 10 + '%';
    return starPercentageRounded;
  };
  const dropDownMenu = function (e) {
    setSelectedArray(e.target.value);
    if (e.target.value === 'newestReviewArray') {
      setOnScreenReviewArray(newestReviewArray.slice(0, 2));
    } else if (e.target.value === 'totalReviewArray') {
      setOnScreenReviewArray(totalReviewArray.slice(0, 2));
    } else if (e.target.value === 'helpfulReviewArray') {
      setOnScreenReviewArray(helpfulReviewArray.slice(0, 2));
    }
  };
  const markClicked = function (id, helpfulness1, helpfulness2) {
    let count = [helpfulness1, helpfulness2];
    setClickedList(prevState => prevState.set( id, count ));
  };
  const reviewsCount = function () {
    if (filterClicked) {
      if (searchTerm.length >= 3 && searchResult.length < sortedArray.length) {
        return searchResult.length;
      }
      return sortedArray.length;
    } else if (searchTerm.length >= 3) {
      return searchResult.length;
    } else {
      return totalReviewArray.length;
    }

  };
  return (
    <div className= "RatingsNReviewsSection">
      <div className= 'review-starSection'>
        <RatingBreakDown onClick={onClick} resetFilter={resetFilter} filter={filter} filterOnClicked={filterOnClicked} oneStar={oneStar} twoStar={twoStar} threeStar={threeStar} fourStar={fourStar} fiveStar={fiveStar} recommended={recommended} starWidth={starWidth} averageRate={averageRate} productId= {productId}/>
        <ProductBreakDown onClick={onClick} characteristics={characteristics}/>
      </div>

      <div className="review-Section">

        <div className='review-searchBar'>
          <input type='text' value={searchTerm} placeholder='Search...' onChange={(e) => {
            searching(e.target.value), setSearchTerm(e.target.value);
          }}></input>
        </div>
        <div className="review-DropDown" >
          <h3 data-testid="totalReviews" style= {{display: 'inline'}}>{reviewsCount()} reviews, sorted by </h3>
          <select data-testid="review-sort-select" onChange={dropDownMenu} id="review-sort-select">
            <option data-testid='select-option' value="totalReviewArray">Relevant</option>
            <option data-testid='select-option' value="newestReviewArray">Newest</option>
            <option data-testid='select-option' value="helpfulReviewArray">Helpful</option>
          </select>
        </div>

        <div className= "review-List">
          {isLoading === true ? <div className='review-loading'><i className="fas fa-spinner "></i> <h3>loading....</h3> </div> : onScreenReviewArray.map((user, index)=>{
            return (
              <div key={index} className="review-Cell" data-testid="review-Cell">
                <div className="review-Top">
                  <div className="review-stars-outer">
                    <div data-testid="review-stars-inner" className="review-stars-inner" style={{width: starWidth(user.rating)}}></div>
                  </div>
                  <span data-testid="review-nameNDate" >{user.reviewer_name}, {convertDate(user.date)}</span>
                </div>
                <ReviewBody body={user.body} summary={user.summary}/>
                {user.photos.length > 0 ?
                  <div data-testid="review-ImageSection" className="review-ImageSection">
                    {user.photos.map((img, index)=>{
                      return (
                        <div key = {index} className="review-Imageblock">
                          <img onClick={openModal} id="review-Images" alt = "user's review image" className = "review-Images" src= {img.url} />
                          <div id="review-Modal" className="review-Modal">
                            <span className="review-Modal-Close" onClick= {closeModal}>&times;</span>
                            <img className="review-Modal-Content" id="review-Modal-Content" />
                          </div>
                        </div>);
                    })}
                  </div> : null}
                {user.recommend ? <div data-testid="review-recommend"><span>✔ &nbsp;</span><span>I recommend this product</span></div> : null}
                {user.response ? (<div className="review-Response"><p>Response from seller:</p> <div className="seller-Response2">{user.response}</div> </div>) : null}
                <HelpfulButton onClick={onClick} clickedList={clickedList} markClicked={markClicked} helpfulness={user.helpfulness} reviewId = {user.review_id}/>
              </div>
            );
          })}
        </div>
        <div className='review-Button' onClick={onClick} >{ isLoading ? null : onScreenReviewArray.length === ((sortedArray.length || searchResult.length) ? (sortedArray.length || searchResult.length) : totalReviewArray.length) || totalReviewArray.length <= 2 ? null : <button data-testid="review-moreButton" onClick= {()=>{ loadReviews(selectedArray); }}>More reviews</button>}
          {isLoading ? null : <button data-testid="review-newReviewButton" onClick={()=>{ setOpenReviewModal(true); }}>Write New Review</button>}
        </div>
        {openReviewModal && <NewReview characteristics={characteristics} currentProduct={currentProduct} productId= {productId} setIsPost={setIsPost} setOpenReviewModal={setOpenReviewModal} />}
      </div>
    </div>
  );
};

export default ClickedData(ReviewList, 'Ratings & Reviews');

