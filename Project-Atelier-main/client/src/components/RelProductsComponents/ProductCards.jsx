import React from 'react';
import Rating from 'react-rating';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar} from '@fortawesome/free-solid-svg-icons';

library.add(emptyStar);
library.add(fullStar);

class ProductCards extends React.Component {
  constructor(props) {
    super(props);

    var endOfShownProducts = this.props.productCards.length;
    if (endOfShownProducts > 3) {
      endOfShownProducts = 4;
    }

    this.state = {
      currentShownProducts: { start: 0, end: endOfShownProducts },
      leftArrowDisplay: true,
      rightArrowDisplay: true
    };

    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    // console.log('productcards', this.props.productCards[0]);
    this.updateStatus();
  }

  updateStatus(e) {
    var start = this.state.currentShownProducts.start;
    var end = this.state.currentShownProducts.end;
    var lengthOfRelProducts = this.props.productCards.length;

    if (e) {
      var cardClassName = e.target.className.split(' ')[0];

      if (cardClassName === 'card-scroll-left') {
        console.log('LEFT: ', start, end, lengthOfRelProducts);

        if (start - 4 <= 0) {
          if (end - 4 <= 4 && end - 4 >= 0) {
            if (end - 4 < start) {
              this.setState({
                currentShownProducts: { start: 0, end: start }
              });
              start = 0;
              end = start + 4;
            } else {
              this.setState({
                currentShownProducts: { start: 0, end: end - 3 }
              });
              start = 0;
              end -= 3;
            }
          } else if (end - 4 < 0) {
            this.setState({
              currentShownProducts: { start: 0, end: 0 }
            });
            start = 0;
            end = 0;
          }
        } else if (start - 4 > 0 && end - 4 > 0) {
          this.setState({
            currentShownProducts: { start: start - 4, end: end - 3}
          });
          start -= 4;
          end -= 3;
        }
      } else if (cardClassName === 'card-scroll-right') {
        console.log('RIGHT: ', start, end, lengthOfRelProducts);
        if (start + 4 <= lengthOfRelProducts) {
          if (end + 4 >= lengthOfRelProducts) {
            this.setState({
              currentShownProducts: { start: start + 4, end: lengthOfRelProducts }
            });
            start += 4;
            end = lengthOfRelProducts;
          } else if (end + 4 < lengthOfRelProducts) {
            this.setState({
              currentShownProducts: { start: start + 4, end: end + 4 }
            });
            start += 4;
            end += 4;
          }
        }
      }
    }

    console.log('updatestatus: ', start, end, lengthOfRelProducts);
    console.log('state: ', this.state.currentShownProducts.start, this.state.currentShownProducts.end);

    if (lengthOfRelProducts <= 4 && lengthOfRelProducts !== 0) {
      this.setState({
        leftArrowDisplay: false,
        rightArrowDisplay: false
      });
    } else {
      if (start !== 0) {
        if (end === lengthOfRelProducts) {
          this.setState({
            leftArrowDisplay: true,
            rightArrowDisplay: false
          });
        } else {
          this.setState({
            leftArrowDisplay: true,
            rightArrowDisplay: true
          });
        }
      } else if (start === 0 && end !== lengthOfRelProducts) {
        this.setState({
          leftArrowDisplay: false,
          rightArrowDisplay: true
        });
      }
    }
  }

  render() {
    if (this.props.productCards.length === 0) {
      return (
        <div>
          <h3>Related Products</h3>
        </div>
      );
    } else {
      return (
        <div className="related-products-container-div">
          <h3>Related Products</h3>
          <div className="product-cards">
            <div className="card-scroll-left arrow-button" onClick={this.updateStatus} style={{display: this.state.leftArrowDisplay ? 'inline-block' : 'none' }}></div>
            {this.props.productCards.slice(this.state.currentShownProducts.start, this.state.currentShownProducts.end).map(product => {
              var price = <h5 className="price-relProd"><span className="price-relProd">{product.results[0].original_price}</span></h5>;

              if (product.results[0].sale_price !== null && product.results[0].sale_price !== undefined) {
                price = <h5 className="price-relProd"><span className="sale_price">{product.results[0].sale_price}</span><span className="original_price">{product.results[0].original_price}</span></h5>;
              }

              return (
                <div className="product-card" key={product.id} onClick={() => { this.props.handleClick(product.id); this.updateStatus(); }}>
                  <img className="card-imgs" src={product.results[0].photos[0].thumbnail_url} alt={product.name} />
                  <div className="product-description">
                    <div className="overview-relProd">
                      <h5 className="category-relProd">{product.category}</h5>
                      <h4 className="name-relProd">{product.name}</h4>
                      {price}
                    </div>
                    <div className="product-ratings">
                      <div className='POStarRating' data-testid="starRating">
                        <Rating start={0} stop={5} initialRating={product.ratings.average} emptySymbol={<FontAwesomeIcon icon={['fas', 'star']} color='#808080' />} fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} color='#f8ce0b' />} readonly />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="card-scroll-right arrow-button" onClick={this.updateStatus} style={{display: this.state.rightArrowDisplay ? 'inline-block' : 'none' }}></div>
          </div>
        </div>
      );
    }
  }
}

export default ProductCards;

// Display Category, Name, Price, Star Rating
// Price: Sale prices should be reflected. Sale price in red, and then original price has been stuckthrough.