import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ClickedData from '../ClickDataAnalytics.jsx';

const HelpfulButton = ({ onClick, reviewId, helpfulness, markClicked, clickedList })=>{
  const [helpfulnessCount, setHelpfulnessCount] = useState(0);
  const [Id, setId] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(()=>{
    setClicked(false);
    if (clickedList.has(reviewId)) {
      let oldHelpfulness = clickedList.get(reviewId)[1];
      helpfulness = Math.max(helpfulness, oldHelpfulness);
      setClicked(true);
    }
    setHelpfulnessCount(helpfulness);
    setId(reviewId);
  }, [helpfulness]);


  const helpfulnessonClicked = function (e) {
    if (!clickedList.has(Id)) {
      markClicked(Id, helpfulness, helpfulness + 1);
      setHelpfulnessCount(helpfulnessCount + 1);
      e.target.className += ' helpfulness-onClicked';
      axios.post('/ratings/updateHelpfulness', {Id: Id})
        .catch((err) => {
          console.log('This is updatehelfulness amount err:', err);
        });
    } else {
      console.log('already click');
      return;
    }
  };
  const reportOnClicked = function (e) {
    e.target.className += ' review-report-onClicked';
    axios.post('/ratings/updateReported', {Id: Id})
      .catch((err) => {
        console.log('This is updatehelReported err:', err);
      });
  };
  return (
    <div data-testid="review-helpful" className='review-helpful' onClick = {onClick}>
      {clicked ?
        <div data-testid="review-helpful-2">
          <span>HelpFul ?</span>
          <span data-testid="review-helpful-2-button" className= { 'review-helpful-1 helpfulness-onClicked ' + reviewId} onClick ={ helpfulnessonClicked }>Yes </span>
          <span id={reviewId}>({helpfulnessCount})</span>
          <span>|</span>
          <span className='review-report' onClick= {reportOnClicked }>Report</span>
        </div>
        :
        <div data-testid="review-helpful-1">
          <span>HelpFul ?</span>
          <span data-testid="review-helpful-1-button" id={reviewId} className= { 'review-helpful-1 ' + reviewId} onClick ={ helpfulnessonClicked }>Yes </span>
          <span data-testid="review-helpful-1-count" id={reviewId}>({helpfulnessCount})</span>
          <span>|</span>
          <span className='review-report' onClick= {reportOnClicked }>Report</span>
        </div>}
    </div>
  );
};

export default HelpfulButton;

