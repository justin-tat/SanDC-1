import React from 'react'
import BarProductBreakdown from './barProductBreakdown.jsx'

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
//Size
    let sizeOneDescription = 'A size too small';
    let sizeTwoDescription = '1/2 a size too small';
    let sizeThreeDescription = 'Perfect';
    let sizeFourDescription = '1/2 a size too big';
    let sizeFiveDescription = 'A size too wide';
    let widthOneDescription = 'Too narrow';
    let widthTwoDescription = 'Slightly narrow';
    let widthThreeDescription = 'Perfect';
    let widthFourDescription = 'Slightly wide';
    let widthFiveDescription = 'Too wide';
    let comfortOneDescription = 'Uncomfortable';
    let comfortTwoDescription = 'Slightly uncomfortable';
    let comfortThreeDescription = 'Ok';
    let comfortFourDescription = 'Comfortable';
    let comfortFiveDescription = 'Perfect';
    let qualityOneDescription = 'Poor';
    let qualityTwoDescription = 'Below average';
    let qualityThreeDescription = 'What I expected';
    let qualityFourDescription = 'Pretty great';
    let qualityFiveDescription = 'Perfect';
    let lengthOneDescription = 'Runs short';
    let lengthTwoDescription = 'Runs slightly short';
    let lengthThreeDescription = 'Perfect';
    let lengthFourDescription = 'Runs slighly long';
    let lengthFiveDescription = 'Runs long';
    let fitOneDescription = 'Runs tight';
    let fitTwoDescription = 'Runs slightly tight';
    let fitThreeDescription = 'Perfect';
    let fitFourDescription = 'Runs slighly long';
    let fitFiveDescription = 'Runs long';

    let metadata = this.props.metadata
    var chars = metadata.characteristics
    let sizeRating
    let widthRating
    let comfortRating
    let qualityRating
    let lengthRating
    let fitRating
    let sizePercent
    let widthPercent
    let comfortPercent
    let qualityPercent
    let lengthPercent
    let fitPercent

    let sizeRatingDesc
    let widthRatingDesc
    let comfortRatingDesc
    let qualityRatingDesc
    let lengthRatingDesc
    let fitRatingDesc

    if (chars.Size) {
      sizeRating = JSON.parse(chars.Size.value).toFixed(1)
      sizePercent = ((sizeRating - 1)*25)-5
      let rounded = Math.round(sizeRating)
      if (rounded === 1) {
        sizeRatingDesc = sizeOneDescription
      } else if (rounded === 2) {
        sizeRatingDesc = sizeTwoDescription
      } else if (rounded === 3) {
        sizeRatingDesc = sizeThreeDescription
      } else if (rounded === 4) {
        sizeRatingDesc = sizeFourDescription
      } else if (rounded === 5) {
        sizeRatingDesc = sizeFiveDescription
      }
    } if (chars.Width) {
      widthRating = JSON.parse(chars.Width.value).toFixed(1)
      widthPercent = ((widthRating - 1)*25)-5
      let rounded = Math.round(widthRating)
      if (rounded === 1) {
        widthRatingDesc = widthOneDescription
      } else if (rounded === 2) {
        widthRatingDesc = widthTwoDescription
      } else if (rounded === 3) {
        widthRatingDesc = widthThreeDescription
      } else if (rounded === 4) {
        widthRatingDesc = widthFourDescription
      } else if (rounded === 5) {
        widthRatingDesc = widthFiveDescription
      }
    } if (chars.Comfort) {
      comfortRating = JSON.parse(chars.Comfort.value).toFixed(1)
      comfortPercent = ((comfortRating - 1)*25)-5
      let rounded = Math.round(comfortRating)
      if (rounded === 1) {
        comfortRatingDesc = comfortOneDescription
      } else if (rounded === 2) {
        comfortRatingDesc = comfortTwoDescription
      } else if (rounded === 3) {
        comfortRatingDesc = comfortThreeDescription
      } else if (rounded === 4) {
        comfortRatingDesc = comfortFourDescription
      } else if (rounded === 5) {
        comfortRatingDesc = comfortFiveDescription
      }
    } if (chars.Quality) {
      qualityRating = JSON.parse(chars.Quality.value).toFixed(1)
      qualityPercent = ((qualityRating - 1)*25)-5
      let rounded = Math.round(qualityRating)
      if (rounded === 1) {
        qualityRatingDesc = qualityOneDescription
      } else if (rounded === 2) {
        qualityRatingDesc = qualityTwoDescription
      } else if (rounded === 3) {
        qualityRatingDesc = qualityThreeDescription
      } else if (rounded === 4) {
        qualityRatingDesc = qualityFourDescription
      } else if (rounded === 5) {
        qualityRatingDesc = qualityFiveDescription
      }
    } if (chars.Length) {
      lengthRating = JSON.parse(chars.Length.value).toFixed(1)
      lengthPercent = ((lengthRating - 1)*25)-5
      let rounded = Math.round(lengthRating)
      if (rounded === 1) {
        lengthatingDesc = lengthOneDescription
      } else if (rounded === 2) {
        lengthRatingDesc = lengthTwoDescription
      } else if (rounded === 3) {
        lengthRatingDesc = lengthThreeDescription
      } else if (rounded === 4) {
        lengthRatingDesc = lengthFourDescription
      } else if (rounded === 5) {
        lengthRatingDesc = lengthFiveDescription
      }
    } if (chars.Fit) {
      fitRating = JSON.parse(chars.Fit.value).toFixed(1)
      fitPercent = ((fitRating - 1)*25)-5
      let rounded = Math.round(fitRating)
      if (rounded === 1) {
        fitRatingDesc = fitOneDescription
      } else if (rounded === 2) {
        fitRatingDesc = fitTwoDescription
      } else if (rounded === 3) {
        fitRatingDesc = fitThreeDescription
      } else if (rounded === 4) {
        fitRatingDesc = fitFourDescription
      } else if (rounded === 5) {
        fitRatingDesc = fitFiveDescription
      }
    }

    return (
      <div className="product-breakdown">
        {chars.Size &&
        <>
        <div className="product-breakdown-row">
          <p>Size: {sizeRatingDesc}</p>
          <BarProductBreakdown position={sizePercent} />
          <p>1: {sizeOneDescription}, 5: {sizeFiveDescription}</p>
        <br></br>
        </div>
        </>}
        {chars.Width &&
        <>
        <div className="product-breakdown-row">
        <p>Width: {widthRatingDesc}</p>
        <BarProductBreakdown position={widthPercent} />
        <p>1: {widthOneDescription}, 5: {widthFiveDescription}</p>
        <br></br>
        </div>
        </>}
        {chars.Comfort &&
        <>
        <div className="product-breakdown-row">
        <p>Comfort: {comfortRatingDesc}</p>
        <BarProductBreakdown position={comfortPercent} />
        <p>1: {comfortOneDescription}, 5: {comfortFiveDescription}</p>
        <br></br>
        </div>
        </>}
        {chars.Quality &&
        <>
        <div className="product-breakdown-row">
        <p>Quality: {qualityRatingDesc}</p>
        <BarProductBreakdown position={qualityPercent} />
        <p>1: {qualityOneDescription}, 5: {qualityFiveDescription}</p>
        <br></br>
        </div>
        </>}
        {chars.Length &&
        <>
        <div className="product-breakdown-row">
        <p>Length: {lengthRatingDesc}</p>
        <BarProductBreakdown position={lengthPercent} />
        <p>1: {lengthOneDescription}, 5: {lengthFiveDescription}</p>
        <br></br>
        </div>
        </>}
        {chars.Fit &&
        <>
        <div className="product-breakdown-row">
        <p>Fit: {fitRatingDesc}</p>
        <BarProductBreakdown position={fitPercent} />
        <p>1: {fitOneDescription}, 5: {fitFiveDescription}</p>
        <br></br>
        </div>
        </>}
      </div>
    )
  }
}

export default ProductBreakdown