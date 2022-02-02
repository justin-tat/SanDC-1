import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewReview = ({ characteristics, currentProduct, productId, setIsPost, setOpenReviewModal }) => {

  const [fitVal, setFitVal] = useState({
    rate: '',
    text: {
      '1': 'Runs tight',
      '2': 'Runs slightly tight',
      '3': 'Perfect',
      '4': 'Runs slightly long',
      '5': 'Runs long'
    }
  });
  const [lengthVal, setLengthVal] = useState({
    rate: '',
    text: {
      '1': 'Runs Short',
      '2': 'Runs slightly short',
      '3': 'Perfect',
      '4': 'Runs slightly long',
      '5': 'Runs long'
    }
  });
  const [qualityVal, setQualityVal] = useState({
    rate: '',
    text: {
      '1': 'Poor',
      '2': 'Below average',
      '3': 'What I expected',
      '4': 'Pretty great',
      '5': 'Perfect'
    }
  });
  const [comfortVal, setComfortVal] = useState({
    rate: '',
    text: {
      '1': 'Uncomfortable',
      '2': 'Slightly uncomfortable',
      '3': 'Ok',
      '4': 'Comfortable',
      '5': 'Perfect'
    }
  });
  const [widthVal, setWidthVal] = useState({
    rate: '',
    text: {
      '1': 'Too narrow',
      '2': 'Slightly narrow',
      '3': 'Perfect',
      '4': 'Slightly wide',
      '5': 'Too wide'
    }
  });
  const [sizeVal, setSizeVal] = useState({
    rate: '',
    text: {
      '1': 'A size too small',
      '2': '½ a size too small',
      '3': 'Perfect',
      '4': '½ a size too big',
      '5': 'A size too wide'
    }
  });
  const [rating, setRating] = useState({
    val: null,
    text: {
      '1': 'Poor',
      '2': 'Fair',
      '3': 'Average',
      '4': 'Good',
      '5': 'Great'
    }
  });
  const [hover, setHover] = useState(null);
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [imgSelected, setImgSelected] = useState('');
  const [imgUrl, setImgUrl] = useState([]);
  const [nickName, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [recommended, setRecommended] = useState('');
  const [fileTypeErr, setFileTypeErr] = useState('');
  const [ratingErr, setRatingErr] = useState('');
  const [recommendedErr, setRecommendedErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [reviewBodyErr, setReviewBodyErr] = useState('');
  const [nickNameErr, setNickNameErr] = useState('');

  const validation = function () {
    let flag = true;
    if (!rating.val) {
      console.log('no rating');
      flag = false;
      setRatingErr('Please provide star rating!');
    }
    if (!recommended) {
      flag = false;
      setRecommendedErr('Please provide your recommendation!');
    }
    if (!emailValidation()) {
      flag = false;
      setEmailErr('The email address provided is not in correct email format');
    }
    if (!fileValidation()) {
      flag = false;
      setFileTypeErr('The images selected are invalid or unable to be uploaded');
    }
    if (reviewBody.length < 50) {
      flag = false;
      setReviewBodyErr('The review body is less than 50 characters');
    }
    if (!nickName.length) {
      flag = false;
      setNickNameErr('Name cannot be blank');
    }
    if ((characteristics.Fit && !fitVal.rate) || (characteristics.Length && !lengthVal.rate) || (characteristics.Comfort && !comfortVal.rate) || (characteristics.Quality && !qualityVal.rate) || (characteristics.Width && !widthVal.rate) || (characteristics.Size && !sizeVal.rate)) {
      console.log('fail in here');
      flag = false;
    }
    return flag;
  };

  const emailValidation = function (content) {
    let emailErrText = '';
    let flag = true;
    if ((content && !content.includes('@')) || !email) {
      emailErrText = 'The email address provided is not in correct email format';
      flag = false;
    }
    setEmailErr(emailErrText);
    return flag;
  };
  const fileValidation = function () {
    let flag = true;
    let errMessage = '';
    if (imgSelected) {
      let fileType = imgSelected.name.split('.').pop();
      if (!(fileType === 'jpeg' || fileType === 'jpg' || fileType === 'png')) {
        flag = false;
        errMessage = 'The images selected are invalid or unable to be uploaded';
      }
    }
    setFileTypeErr(errMessage);
    return flag;
  };
  const postReview = function () {
    if (validation()) {
      axios.post('/ratings/postReview', {
        productId: productId,
        rating: rating.val,
        reviewSummary: reviewSummary,
        reviewBody: reviewBody,
        imgUrl: imgUrl,
        nickName: nickName,
        email: email,
        recommended: recommended,
        Chars: [
          {
            val: Number(fitVal.rate),
            Id: characteristics.Fit ? characteristics.Fit.id : ''
          }, {
            val: Number(lengthVal.rate),
            Id: characteristics.Length ? characteristics.Length.id : ''
          }, {
            val: Number(qualityVal.rate),
            Id: characteristics.Quality ? characteristics.Quality.id : ''
          }, {
            val: Number(widthVal.rate),
            Id: characteristics.Width ? characteristics.Width.id : ''
          }, {
            val: Number(comfortVal.rate),
            Id: characteristics.Comfort ? characteristics.Comfort.id : ''
          }, {
            val: Number(sizeVal.rate),
            Id: characteristics.Size ? characteristics.Size.id : ''
          },
        ]
      })
        .then(() => {
          setIsPost(true);
          setOpenReviewModal(false);
        })
        .catch((err) => {
          console.log('client side postReview error:', err);
        });
    }
    return;
  };
  const generateText = function () {
    if (rating !== null) {
      return rating.text[rating.val];
    }
    return;
  };
  const bodyWordCount = function () {
    return reviewBody.length >= 50 ? 'Minimum reached' : 'Minimum required characters left:' + (50 - reviewBody.length);
  };
  const uploadImg = function () {
    setFileTypeErr('');
    if (fileValidation()) {
      var formData = new FormData();
      formData.append('file', imgSelected);
      formData.append('upload_preset', 'a3yw936t');
      axios.post('https://api.cloudinary.com/v1_1/dqidinkkf/upload', formData)
        .then((response) => {
          setImgUrl((prevState) => { return [...prevState, response.data.secure_url]; });
        })
        .catch((err) => {
          console.log('this is the client side img upload err:', err);
        });
    } else {
      console.log('incorrect file type');
      return;
    }

  };
  return (
    <div className="newReview-Background">
      <div className="newReview-Container">
        <div className="newReview-TopCloseBtn">
          <button
            onClick={() => {
              setOpenReviewModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Write Your Review</h1>
          <h3 data-testid='newReview-currentProduct'>{currentProduct.name}</h3>
        </div>
        <div className="newReview-Body">
          <div className="newReview-overallRating ">
            <h3>Overall rating &#42;</h3>
            {!rating.val ? <p style={{ color: 'red' }}>{ratingErr}</p> : null}
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label data-testid='newReview-rating' key={index}>
                  <input
                    className='newReview-Star-Input'
                    type='radio'
                    name='rating'
                    value={ratingValue}
                    onClick={() => {
                      setRating((prevState) => ({
                        ...prevState,
                        val: ratingValue
                      }));
                    }}
                  />
                  <span data-testid='newReview-rating-star' className={ratingValue <= (rating.val || hover) ? 'newReview-Star-After' : 'newReview-Star'}
                    onMouseEnter={() => { setHover(ratingValue); }}
                    onMouseLeave={() => { setHover(null); }}>
                  </span>
                </label>
              );
            })}
            <span data-testid='newReview-rating-star-text'>&nbsp; {generateText()}</span>
          </div>
          <div className='newReview-Recommended'>
            <h3>Do you recommend this product ? &#42;</h3>
            {!recommended ? <p style={{ color: 'red' }}>{recommendedErr}</p> : null}
            <input data-testid='newReview-recommendedY' type="radio" id="newReview-recommendedY" name="recommended" value= 'Yes' onChange={() => { setRecommended('true'); }} />
            <label htmlFor="newReview-recommendedY">Yes</label>
            <input data-testid='newReview-recommendedN' type="radio" id="newReview-recommendedN" name="recommended" value= 'No' onChange={() => { setRecommended('false'); }} />
            <label htmlFor="newReview-recommendedN">No</label>
          </div>

          <div className='newReview-Characteristics'>
            <h3>Characteristics &#42;</h3>
            { characteristics && characteristics.Fit === undefined ? null : <div className='newReview-Characteristics-Fit'>
              {fitVal.rate ? <p>{fitVal.text[fitVal.rate]}</p> : <p style={{ color: 'red' }}>none selected</p>}
              <span style={{ fontWeight: 'bold' }}>Fit</span>
              <input data-testid='newReview-fit-1' type="radio" id="newReview-fit-1" name="Fit-1" value={fitVal.rate} checked={fitVal.rate === '1' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: '1'
                }));
              }} />
              <label htmlFor="newReview-fit-1">1</label>
              <input data-testid='newReview-fit-2' type="radio" id="newReview-fit-2" name="Fit-2" value={fitVal.rate} checked={fitVal.rate === '2' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: '2'
                }));
              }} />
              <label htmlFor="newReview-fit-2">2</label>
              <input data-testid='newReview-fit-3' type="radio" id="newReview-fit-3" name="Fit-3" value={fitVal.rate} checked={fitVal.rate === '3' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: '3'
                }));
              }} />
              <label htmlFor="newReview-fit-3">3</label>
              <input data-testid='newReview-fit-4' type="radio" id="newReview-fit-4" name="Fit-4" value={fitVal.rate} checked={fitVal.rate === '4' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: '4'
                }));
              }} />
              <label htmlFor="newReview-fit-4">4</label>
              <input data-testid='newReview-fit-5' type="radio" id="newReview-fit-5" name="Fit-5" value={fitVal.rate} checked={fitVal.rate === '5' ? true : false} onChange={e => {
                setFitVal((prevState) => ({
                  ...prevState,
                  rate: '5'
                }));
              }} />
              <label htmlFor="newReview-fit-5">5</label>
              <p>1=Runs tight, 5=Runs long</p>
            </div>}

            { characteristics && characteristics.Length === undefined ? null : <div className='newReview-Characteristics-Length'>
              {lengthVal.rate ? <p>{lengthVal.text[lengthVal.rate]}</p> : <p style={{ color: 'red' }}>none selected</p>}
              <span style={{ fontWeight: 'bold' }}>Length</span>
              <input data-testid='newReview-length-1' type="radio" id="newReview-length-1" name="Length-1" value={lengthVal.rate} checked={lengthVal.rate === '1' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: '1'
                }));
              }} />
              <label htmlFor="newReview-length-1">1</label>
              <input data-testid='newReview-length-2' type="radio" id="newReview-length-2" name="Length-2" value={lengthVal.rate} checked={lengthVal.rate === '2' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: '2'
                }));
              }} />
              <label htmlFor="newReview-length-2">2</label>
              <input data-testid='newReview-length-3' type="radio" id="newReview-length-3" name="Length-3" value={lengthVal.rate} checked={lengthVal.rate === '3' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: '3'
                }));
              }} />
              <label htmlFor="newReview-length-3">3</label>
              <input data-testid='newReview-length-4' type="radio" id="newReview-length-4" name="Length-4" value={lengthVal.rate} checked={lengthVal.rate === '4' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: '4'
                }));
              }} />
              <label htmlFor="newReview-length-4">4</label>
              <input data-testid='newReview-length-5' type="radio" id="newReview-length-5" name="Length-5" value={lengthVal.rate} checked={lengthVal.rate === '5' ? true : false} onChange={e => {
                setLengthVal((prevState) => ({
                  ...prevState,
                  rate: '5'
                }));
              }} />
              <label htmlFor="newReview-length-5">5</label>
              <p>1=Runs Short, 5=Runs long</p>
            </div>}

            { characteristics && characteristics.Quality === undefined ? null : <div className='newReview-Characteristics-Quality'>
              {qualityVal.rate ? <p>{qualityVal.text[qualityVal.rate]}</p> : <p style={{ color: 'red' }}>none selected</p>}
              <span style={{ fontWeight: 'bold' }}>Quality</span>
              <input data-testid='newReview-quality-1' type="radio" id="newReview-quality-1" name="Quality-1" value={qualityVal.rate} checked={qualityVal.rate === '1' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: '1'
                }));
              }} />
              <label htmlFor="newReview-quality-1">1</label>
              <input data-testid='newReview-quality-2' type="radio" id="newReview-quality-2" name="Quality-2" value={qualityVal.rate} checked={qualityVal.rate === '2' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: '2'
                }));
              }} />
              <label htmlFor="newReview-quality-2">2</label>
              <input data-testid='newReview-quality-3' type="radio" id="newReview-quality-3" name="Quality-3" value={qualityVal.rate} checked={qualityVal.rate === '3' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: '3'
                }));
              }} />
              <label htmlFor="newReview-quality-3">3</label>
              <input data-testid='newReview-quality-4' type="radio" id="newReview-quality-4" name="Quality-4" value={qualityVal.rate} checked={qualityVal.rate === '4' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: '4'
                }));
              }} />
              <label htmlFor="newReview-quality-4">4</label>
              <input data-testid='newReview-quality-5' type="radio" id="newReview-quality-5" name="Quality-5" value={qualityVal.rate} checked={qualityVal.rate === '5' ? true : false} onChange={e => {
                setQualityVal((prevState) => ({
                  ...prevState,
                  rate: '5'
                }));
              }} />
              <label htmlFor="newReview-quality-5">5</label>
              <p>1=Poor, 5=Perfect</p>
            </div>}


            { characteristics && characteristics.Comfort === undefined ? null : <div className='newReview-Characteristics-Comfort'>
              {comfortVal.rate ? <p>{comfortVal.text[comfortVal.rate]}</p> : <p style={{ color: 'red' }}>none selected</p>}
              <span style={{ fontWeight: 'bold' }}>Comfort</span>
              <input data-testid='newReview-comfort-1' type="radio" id="newReview-comfort-1" name="Comfort-1" value={comfortVal.rate} checked={comfortVal.rate === '1' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: '1'
                }));
              }} />
              <label htmlFor="newReview-comfort-1">1</label>
              <input data-testid='newReview-comfort-2' type="radio" id="newReview-comfort-2" name="Comfort-2" value={comfortVal.rate} checked={comfortVal.rate === '2' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: '2'
                }));
              }} />
              <label htmlFor="newReview-comfort-2">2</label>
              <input data-testid='newReview-comfort-3' type="radio" id="newReview-comfort-3" name="Comfort-3" value={comfortVal.rate} checked={comfortVal.rate === '3' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: '3'
                }));
              }} />
              <label htmlFor="newReview-comfort-3">3</label>
              <input data-testid='newReview-comfort-4' type="radio" id="newReview-comfort-4" name="Comfort-4" value={comfortVal.rate} checked={comfortVal.rate === '4' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: '4'
                }));
              }} />
              <label htmlFor="newReview-comfort-4">4</label>
              <input data-testid='newReview-comfort-5' type="radio" id="newReview-comfort-5" name="Comfort-5" value={comfortVal.rate} checked={comfortVal.rate === '5' ? true : false} onChange={e => {
                setComfortVal((prevState) => ({
                  ...prevState,
                  rate: '5'
                }));
              }} />
              <label htmlFor="newReview-comfort-5">5</label>
              <p>1=Uncomfortable, 5=Perfect</p>
            </div>}

            { characteristics && characteristics.Width === undefined ? null : <div className='newReview-Characteristics-Width'>
              {widthVal.rate ? <p>{widthVal.text[widthVal.rate]}</p> : <p style={{ color: 'red' }}>none selected</p>}
              <span style={{ fontWeight: 'bold' }}>Width</span>
              <input data-testid='newReview-width-1' type="radio" id="newReview-width-1" name="Width-1" value={widthVal.rate} checked={widthVal.rate === '1' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: '1'
                }));
              }} />
              <label htmlFor="newReview-width-1">1</label>
              <input data-testid='newReview-width-2' type="radio" id="newReview-width-2" name="Width-2" value={widthVal.rate} checked={widthVal.rate === '2' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: '2'
                }));
              }} />
              <label htmlFor="newReview-width-2">2</label>
              <input data-testid='newReview-width-3' type="radio" id="newReview-width-3" name="Width-3" value={widthVal.rate} checked={widthVal.rate === '3' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: '3'
                }));
              }} />
              <label htmlFor="newReview-width-3">3</label>
              <input data-testid='newReview-width-4' type="radio" id="newReview-width-4" name="Width-4" value={widthVal.rate} checked={widthVal.rate === '4' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: '4'
                }));
              }} />
              <label htmlFor="newReview-width-4">4</label>
              <input data-testid='newReview-width-5' type="radio" id="newReview-width-5" name="Width-5" value={widthVal.rate} checked={widthVal.rate === '5' ? true : false} onChange={e => {
                setWidthVal((prevState) => ({
                  ...prevState,
                  rate: '5'
                }));
              }} />
              <label htmlFor="newReview-width-5">5</label>
              <p>1=Too narrow, 5=Too width</p>
            </div>}

            { characteristics && characteristics.Size === undefined ? null : <div className='newReview-Characteristics-Size'>
              {sizeVal.rate ? <p>{sizeVal.text[sizeVal.rate]}</p> : <p style={{ color: 'red' }}>none selected</p>}
              <span style={{ fontWeight: 'bold' }}>Size</span>
              <input data-testid='newReview-size-1' type="radio" id="newReview-size-1" name="Size-1" value={sizeVal.rate} checked={sizeVal.rate === '1' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: '1'
                }));
              }} />
              <label htmlFor="newReview-size-1">1</label>
              <input data-testid='newReview-size-2' type="radio" id="newReview-size-2" name="Size-2" value={sizeVal.rate} checked={sizeVal.rate === '2' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: '2'
                }));
              }} />
              <label htmlFor="newReview-size-2">2</label>
              <input data-testid='newReview-size-3' type="radio" id="newReview-size-3" name="Size-3" value={sizeVal.rate} checked={sizeVal.rate === '3' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: '3'
                }));
              }} />
              <label htmlFor="newReview-size-3">3</label>
              <input data-testid='newReview-size-4' type="radio" id="newReview-size-4" name="Size-4" value={sizeVal.rate} checked={sizeVal.rate === '4' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: '4'
                }));
              }} />
              <label htmlFor="newReview-size-4">4</label>
              <input data-testid='newReview-size-5' type="radio" id="newReview-size-5" name="Size-5" value={sizeVal.rate} checked={sizeVal.rate === '5' ? true : false} onChange={e => {
                setSizeVal((prevState) => ({
                  ...prevState,
                  rate: '5'
                }));
              }} />
              <label htmlFor="newReview-size-5">5</label>
              <p>1=A size too small, 5=A size too wide</p>
            </div>
            }
          </div>
          <div data-testid='newReview-Summary' className='newReview-Summary'>
            <h3>Review summary</h3>
            <textarea
              maxLength="60"
              placeholder='Example: Best purchase ever!'
              value={reviewSummary}
              onKeyPress={e => {
                if (e.key === 'Enter') { e.preventDefault(); }
              }}
              onChange={(e) => { setReviewSummary(e.target.value); }}
            />
          </div>

          <div data-testid='newReview-Body' className='newReview-Content'>
            <h3>Review body &#42;</h3>
            {reviewBody.length < 50 ? <p style={{ color: 'red' }}>{reviewBodyErr}</p> : null}
            <textarea
              maxLength="1000"
              value={reviewBody}
              placeholder='Why did you like the product or not ?'
              onKeyPress={e => {
                if (e.key === 'Enter') { e.preventDefault(); }
              }}
              onChange={(e) => { setReviewBody(e.target.value); }}
            />
            <br></br>
            <i style={{ fontSize: '20px' }}>{bodyWordCount()}</i>

          </div>

          <div data-testid='newReview-fileUpLoad' className='newReview-fileUpLoad'>
            <h3>Upload your photos</h3>
            {fileTypeErr ? <p style={{ color: 'red' }}>The images selected are invalid or unable to be uploaded</p> : null}
            <label htmlFor="img-uploader">Upload img:</label>
            <input multiple data-testid='img-uploader' id="img-uploader" type='file' onChange={(e) => { setImgSelected(e.target.files[0]); }} />
            <button className = 'review-general-button' data-testid='upload-button' disabled={imgUrl.length >= 5 ? true : false} onClick={uploadImg}>Upload Image</button>
            {imgUrl.length > 0 ?
              <div className="review-ImageSection">
                {imgUrl.map((url, index) => {
                  return (
                    <div key={index} className="review-Imageblock">
                      <img data-testid='upload-img' id="review-Images" alt="uploaded img" className="review-Images" src={url} />
                    </div>);
                })}
              </div> : null}
          </div>

          <div data-testid='newReview-nickName' className='newReview-nickName'>
            <h3>What is your nickname ? &#42;</h3>
            {!nickName.length ? <p style={{ color: 'red' }}>{nickNameErr}</p> : null}
            <input type='input' placeholder='Example: jackson11!' value = {nickName} onChange={(e) => { setNickname(e.target.value); }} />
            <br></br>
            <i style={{ fontSize: '20px' }}>For privacy reasons, do not use your full name or email address</i>
          </div>

          <div data-testid='newReview-Email' className='newReview-Email'>
            <h3>Your email &#42;</h3>
            {emailErr ? <p style={{ color: 'red' }}>{emailErr}</p> : null}
            <textarea
              maxLength="60"
              value={email}
              placeholder='Example: jackson11@email.com'
              onKeyPress={e => {
                if (e.key === 'Enter') { e.preventDefault(); }
              }}
              onChange={(e) => { emailValidation(e.target.value), setEmail(e.target.value); }}
            />
            <br></br>
            <i style={{ fontSize: '20px' }}>For authentication reasons, you will not be emailed</i>
          </div>



        </div>
        <div className="newReview-Footer">
          <button
            onClick={() => {
              setOpenReviewModal(false);
            }}
            data-testid = 'newReview-CancelBtn'
            id="newReview-CancelBtn"
          >
            Cancel
          </button>
          <button onClick={() => { postReview(); }}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default NewReview;