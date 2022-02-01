import React from 'react'
import StarRating from './starRating.jsx'
import Category from './Category.jsx'
import ProductTitle from './ProductTitle.jsx'
import Description from './Description.jsx'
import Price from './Price.jsx'
import StyleSelector from './StyleSelector.jsx'
import SizeSelector from './SizeSelector.jsx'
import QuantitySelector from './QuantitySelector.jsx'
import AddToCart from './AddToCart.jsx'
import StarButton from './StarButton.jsx'
import MainImage from './MainImage.jsx'
import ThumbnailBar from './ThumbnailBar.jsx'
import axios from 'axios'
import $ from 'jquery'

class Overview extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      product: [],
      ratings: {},
      styles: [],
      displayedStyleName: '',
      skus: {},
      salePrice: null,

      selectedStylePhotos: [],
      thumbnailBarPhotos: [],
      mainImage: '',
      mainImageIndex: 0,
      expand: false,

      hasData: false,
      selectedSize: 'Select Size',
      showSizes: false,
      noSizeSelected: false,
      availableQuantity: '',
      selectedQuantity: '',

      hideAddToCart: false,
      displayAddToCart: false,
      cart: []
    }

    this.getProductData = this.getProductData.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
    this.mainImageNext = this.mainImageNext.bind(this)
    this.mainImagePrev = this.mainImagePrev.bind(this)
    this.changeThumbnail = this.changeThumbnail.bind(this)
    this.thumbnailScrollUp = this.thumbnailScrollUp.bind(this)
    this.thumbnailScrollDown = this.thumbnailScrollDown.bind(this)
    this.expandedView = this.expandedView.bind(this)
    this.iconClick = this.iconClick.bind(this)
    this.selectSize = this.selectSize.bind(this)
    this.selectQuantity = this.selectQuantity.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.hideAddToCart = this.hideAddToCart.bind(this)
    this.openSizeDropDown = this.openSizeDropDown.bind(this)
  };


  getProductData(id)  {
    let data = {data: id}
    axios.post('/overview-products', data )
    .then(result => {
      this.setState({
        product: result.data
      })
    })

    .then(() => {
      axios.post('/overview-ratings', data)
      .then(result => {
        this.setState({
          ratings: result.data.ratings
        })
      })
    })
    .then(() => {
      axios.post('/overview-styles', data)
      .then(result => {
        this.setState({
          styles: result.data.results,
          displayedStyleName: result.data.results[0].name,
          selectedStylePhotos: result.data.results[0].photos,
          mainImage: result.data.results[0].photos[0].url,
          thumbnailBarPhotos: result.data.results[0].photos,
          skus: result.data.results[0].skus,
          salePrice: result.data.results[0].sale_price,
          hasData: true
        })
      })
    })
    .catch(err =>
      console.log('error in get product by id')
    )
  }

  changeStyle(name, salePrice, skus, photos) {
    // console.log('change style display called', photos)
    this.setState({
      displayedStyleName: name,
      skus: skus,
      salePrice: salePrice,
      selectedStylePhotos: photos,
      mainImage: photos[0].url,
      thumbnailBarPhotos: photos
    })
  };

  mainImageNext() {
    // console.log('main image next called')
    var photos = this.state.selectedStylePhotos
    var newCurrent = this.state.mainImageIndex === photos.length - 1 ? 0
    : this.state.mainImageIndex + 1
    var nextPhoto = photos[newCurrent]
    var urls = this.state.thumbnailBarPhotos.map(photo => photo.url)

    if(urls.indexOf(nextPhoto.url) > 4) {
      const photos = this.state.thumbnailBarPhotos.slice()
      const photo = photos[0]

      photos.splice(0, 1)
      photos.push(photo)
      this.thumbnailScrollDown(photos)
    }

    this.setState({
      mainImage: photos[newCurrent].url,
      mainImageIndex: newCurrent
    })
  };

  mainImagePrev(){
    // console.log('main image next called')
    var photos = this.state.selectedStylePhotos
    var newCurrent = this.state.mainImageIndex === 0 ? photos.length - 1
    : this.state.mainImageIndex - 1
    var nextPhoto = photos[newCurrent]
    var urls = this.state.thumbnailBarPhotos.map(photo => photo.url)

    if(urls.indexOf(nextPhoto.url) > 4) {
    const photos = this.state.thumbnailBarPhotos.slice()
    const index = photos.length - 1
    const photo = photos[index]

    photos.splice(index, 1)
    photos.unshift(photo)
    this.thumbnailScrollUp(photos)

    }
    this.setState({
      mainImage: photos[newCurrent].url,
      mainImageIndex: newCurrent
    })
    // console.log('current', this.state.mainImageIndex)
  };


  changeThumbnail(photoUrl, index) {
    this.setState({
      mainImage: photoUrl,
      mainImageIndex: index
    })
  };

  thumbnailScrollUp(photos) {
    // console.log('photos', photos)
    this.setState({
      thumbnailBarPhotos: photos
    })
  };

  thumbnailScrollDown(photos) {
    this.setState({
      thumbnailBarPhotos: photos
    })
  }

  expandedView() {
    var expandState = this.state.expand
    this.setState({
      expand: !expandState
    })
  }

  iconClick(photo, index) {
    // console.log('overview icon clicked', photo, index)
    this.setState({
      mainImage: photo,
      mainImageIndex: index
    })
  }

  selectSize(size, available) {
    this.setState({
      selectedSize: size,
      availableQuantity: Number(available),
      selectedQuantity: 1,
      showSizes: false,
      noSizeSelected: false
    })
  };

  selectQuantity(quantity) {
    // console.log('selectquantity called', quantity)
    this.setState({
      selectedQuantity: quantity
    })
  };

  openSizeDropDown() {
    // console.log('open size parent called')
    this.setState({
      showSizes: true,
      noSizeSelected: true
    })
  };

  addToCart() {
    var $size = $(".size-selector").val()
    if ($size === 'Select Size') {
    this.setState({
      noSizeSelected: true
    })
  } else {
    this.setState({
      displayAddToCart: true,
      noSizeSelected: false
    })
  }
}

  hideAddToCart() {
    // console.log('hide add to cart called')
    this.setState({
      hideAddToCart: true
    })
  };

  //on component did mount-- query api for products
  componentDidMount() {
    this.setState({
      id: this.props.id
    })
    this.getProductData(this.props.id)
  };

  componentDidUpdate(prevProps) {
    if(this.props.id !== prevProps.id) {
      this.setState({
        id: this.props.id
      })
      this.getProductData(this.props.id)
    }
  }

  render() {
    if (!this.state.hasData) {
      return <div>Loading Product Overview</div>
    } else {
      var description;
      var displayAdded;
      if(this.state.product.description) {
        description = <Description description={this.state.product.description} />
      }
      if(this.state.displayAddToCart && !this.state.noSizeSelected) {
        displayAdded = <div>
          <p>Item added to cart!</p>
        </div>
      }
    }

      return (
        <div className="overview">
          <div className="default-gallery">
          <MainImage clickTracker={this.props.clickTracker} image={this.state.mainImage} mainImageNext={this.mainImageNext} mainImagePrev={this.mainImagePrev}
          iconClick={this.iconClick} index={this.state.mainImageIndex} photos={this.state.selectedStylePhotos}
          expandedView={this.expandedView} modalOpen={this.state.expand}/>
          <ThumbnailBar clickTracker={this.props.clickTracker} photos={this.state.thumbnailBarPhotos} changeThumbnail={this.changeThumbnail}
          thumbnailScrollUp={this.thumbnailScrollUp} thumbnailScrollDown={this.thumbnailScrollDown}
          modalOpen={this.state.expand}/>
          {description}
          </div>

          <div className="product-info">
            <div className="product-details">
            <StarRating ratings={this.state.ratings}/>
            <Category category = {this.state.product.category} className="category"/>
            <ProductTitle name={this.state.product.name}/>
            <Price price={this.state.product.default_price} salePrice={this.state.salePrice}/>
            </div>

            <div className="style-selector">
              <div className="selected-style">
                <p className="style"><b>STYLE</b></p>
                <p>{this.state.displayedStyleName.toUpperCase()}</p>
              </div>
              <StyleSelector clickTracker={this.props.clickTracker} changeStyle={this.changeStyle} styles={this.state.styles}
              selectedStyle={this.state.displayedStyleName} />
            </div>

            <div className="selectors">
              <SizeSelector clickTracker={this.props.clickTracker} skus={this.state.skus} selectSize={this.selectSize}
              openSizeDropDown={this.openSizeDropDown} showSizes={this.state.showSizes}
              hideAddToCart={this.hideAddToCart} noSizeSelected={this.state.noSizeSelected}/>
              <QuantitySelector clickTracker={this.props.clickTracker} size={this.state.selectedSize} available={this.state.availableQuantity}
              selectQuantity={this.selectQuantity}/>


          <AddToCart clickTracker={this.props.clickTracker} addToCart={this.addToCart} openSizeDropDown={this.openSizeDropDown} noSizeSelected={this.state.noSizeSelected}
          style={this.state.displayedStyleName} size={this.state.selectedSize}
          quantity={this.state.selectedQuantity} hide={this.state.hideAddToCart} />
          <StarButton clickTracker={this.props.clickTracker}/>
          {displayAdded}
          </div>
          </div>

        </div>
    )
  }
}

export default Overview;