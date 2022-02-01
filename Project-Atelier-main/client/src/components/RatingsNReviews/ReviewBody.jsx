import React, {useState, useEffect} from 'react';

const ReviewBody = ({body, summary})=>{
  const [isTruncated, setIsTruncated] = useState(true);
  const [isExtended, setExtended] = useState('Show More');

  const toggleIsTruncated = function () {
    setIsTruncated(isTruncated === true ? false : true);
    setExtended (isExtended === 'Show Less' ? 'Show More' : 'Show Less');
  };


  return (
    <div>
      <h3 className="review-Summary" data-testid="review-summary">{summary.slice(0, 60)}</h3>
      <div data-testid="review-body" className="review-Body"> {summary.length > 60 ?
        <div data-testid="review-Extended-Summary" className="extended-Summary">{summary.slice(60)}</div> : null} <br></br>{body.length > 250 ?
        <div >{isTruncated ? <div >{body.substring(0, 250)}.........................</div> : <div >{body}</div>}
          <div><button className = 'review-general-button' onClick = { toggleIsTruncated }>{isExtended}</button></div> </div> : <div>{body}</div>}
      </div>
    </div>
  );
};

export default ReviewBody;