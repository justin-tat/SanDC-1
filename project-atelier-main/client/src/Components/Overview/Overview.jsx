import React from 'react';
import axios from 'axios';
import Gallery from './Gallery.jsx'
import Description from './Description.jsx';
import Styles from './Styles.jsx';
import Cart from './Cart.jsx';
import Modal from './Modal.jsx';
import $ from 'jquery';

class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      prevPhotoId: null,
      currentPhotoId: 0,
      nextPhotoId: 1,
      currentStyle: 0,
      prevPhotoUrl: '',
      currentPhotoUrl: '',
      nextPhotoUrl: '',
      styles: [],
      productInfo: [],
      maxLength: 0,
      inventory: [],
      cart: [],
      modalOn: false,
      avgRating: 0
    }
    this.changePhoto = this.changePhoto.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.addToCart = this.addToCart.bind(this)
    this.toggleModal = this.toggleModal.bind(this);
  }

  addToCart(cartState) {
    var newCart = this.state.cart.slice();
    newCart.push(cartState);
    this.setState({ cart: newCart })
  }

  changePhoto(event) {
    var currentPhotoId = this.state.currentPhotoId;
    if (event.target.id === 'forward') {
      //change to next currentPhotoUrl
      this.setState({ prevPhotoId: currentPhotoId || null }); //prev photo is former current photo
      this.setState({ currentPhotoId: currentPhotoId + 1 || null }); //new current photo is old + 1
      this.setState({ nextPhotoId: currentPhotoId + 2 || null }); //new next photo is old + 2
      this.setState({ prevPhotoUrl: this.state.styles[this.state.currentStyle].photos[currentPhotoId].url || null }); //prev photo is former current photo
      this.setState({ currentPhotoUrl: this.state.styles[this.state.currentStyle].photos[currentPhotoId + 1].url || null }); //new current photo is old + 1
      this.setState({ nextPhotoUrl: this.state.styles[this.state.currentStyle].photos[currentPhotoId + 2].url || null }); //new next photo is old + 2
    } else if (event.target.id === 'back') {
      //change to previous currentPhotoUrl
      if (currentPhotoId === 1) {
        this.setState({ prevPhotoId: null }); //prev photo doesn't exist
        this.setState({ currentPhotoId: 0 }); //new current photo is the first photo
        this.setState({ nextPhotoId: 1 }); //new next photo is old
        this.setState({ prevPhotoUrl: null }); //prev photo doesn't exist
        this.setState({ currentPhotoUrl: this.state.styles[this.state.currentStyle].photos[0].url }); //new current photo is the first photo
        this.setState({ nextPhotoUrl: this.state.styles[this.state.currentStyle].photos[1].url }); //new next photo is second photo
      } else {
        this.setState({ prevPhotoId: currentPhotoId - 2 ? currentPhotoId - 2 : null }); //prev photo is old - 2
        this.setState({ currentPhotoId: currentPhotoId - 1 ? currentPhotoId - 1 : 0 }); //new current photo is old - 1
        this.setState({ nextPhotoId: currentPhotoId - 1 ? currentPhotoId - 1 : null }); //new next photo is old
        this.setState({ prevPhotoUrl: this.state.styles[this.state.currentStyle].photos[currentPhotoId - 2].url ? this.state.styles[this.state.currentStyle].photos[currentPhotoId - 2].url : null }); //prev photo is old - 2
        this.setState({ currentPhotoUrl: this.state.styles[this.state.currentStyle].photos[currentPhotoId - 1].url ? this.state.styles[this.state.currentStyle].photos[currentPhotoId - 1].url : this.state.styles[this.state.currentStyle].photos[0].url }); //new current photo is old - 1
        this.setState({ nextPhotoUrl: this.state.styles[this.state.currentStyle].photos[currentPhotoId].url }); //new next photo is old
      }
      this.setState({ prevPhotoId: currentPhotoId - 2 ? currentPhotoId - 2 : null }); //prev photo is old - 2
      this.setState({ currentPhotoId: currentPhotoId - 1 ? currentPhotoId - 1 : 0 }); //new current photo is old - 1
      this.setState({ nextPhotoId: currentPhotoId - 1 ? currentPhotoId - 1 : null }); //new next photo is old
      this.setState({ prevPhotoUrl: this.state.styles[this.state.currentStyle].photos[currentPhotoId - 2].url ? this.state.styles[this.state.currentStyle].photos[currentPhotoId - 2].url : null }); //prev photo is old - 2
      this.setState({ currentPhotoUrl: this.state.styles[this.state.currentStyle].photos[currentPhotoId - 1].url ? this.state.styles[this.state.currentStyle].photos[currentPhotoId - 1].url : this.state.styles[this.state.currentStyle].photos[0].url }); //new current photo is old - 1
      this.setState({ nextPhotoUrl: this.state.styles[this.state.currentStyle].photos[currentPhotoId].url }); //new next photo is old
    } else {
      this.setState({ prevPhotoUrl: this.state.styles[this.state.currentStyle].photos[Number.parseInt(event.target.id) - 1] || null });
      this.setState({ currentPhotoUrl: this.state.styles[this.state.currentStyle].photos[Number.parseInt(event.target.id)].url });
      this.setState({ nextPhotoUrl: this.state.styles[this.state.currentStyle].photos[Number.parseInt(event.target.id) + 1].url || null });
      this.setState({ prevPhotoId: Number.parseInt(event.target.id) + 1 || null });
      this.setState({ currentPhotoId: Number.parseInt(event.target.id) });
      this.setState({ nextPhotoId: Number.parseInt(event.target.id) - 1 } || null);
    }
  }

  toggleModal() {
    if (this.state.modalOn === true) {
      this.setState({ modalOn: false })
      $('html body').css({ overflow: 'visible' });
      $('html body').removeClass('ov-removeMargin');
      $('.ov-changePhoto').css({ visibility: 'visible' });
    } else {
      this.setState({ modalOn: true })
      $('html body').css({ overflow: 'hidden' });
      $('html body').addClass('ov-removeMargin');
      $('.ov-changePhoto').css({ visibility: 'hidden' });
    }
  }

  changeStyle(event) {
    var checkmark = '<span class="fa fa-check ov-checkmark"></span>';
    var id = Number.parseInt(event.target.id);
    //add checkmark to current style
    $('.fa-check').remove();
    $('#' + event.target.id).after(checkmark);
    this.setState({ currentStyle: id })
    this.setState({ prevPhotoUrl: this.state.styles[id].photos[this.state.maxLength - 1].url})
    this.setState({ currentPhotoUrl: this.state.styles[id].photos[0].url })
    this.setState({ nextPhotoUrl: this.state.styles[id].photos[1].url})
    this.setState({ inventory: this.state.styles[id].skus })
  }


  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = this.props.token
    axios.get(this.props.apiUrl + '/products/' + this.props.currentProduct + '/styles')
      .then((results) => {
        //set photos to API results at current index at photos array at current style index
        this.setState({ prevPhotoUrl: results.data.results[0].photos[results.data.results[0].photos.length - 1].url })
        this.setState({ currentPhotoUrl: results.data.results[0].photos[0].url })
        this.setState({ nextPhotoUrl: results.data.results[0].photos[1].url })
        this.setState({ styles: results.data.results });
        this.setState({ inventory: results.data.results[0].skus })
        this.setState({ maxLength: results.data.results.map(id => id.photos).length })
      });
    axios.get(this.props.apiUrl + '/products/' + this.props.currentProduct)
      .then((results) => {
        this.setState({ productInfo: results.data })
      });
    axios.get(this.props.apiUrl + '/reviews/?product_id=' + this.props.currentProduct)
      .then((results) => {
        return results.data.results.map(item => item.rating);
      })
      .then((ratings) => this.setState({ avgRating: Math.floor(ratings.reduce((a, b) => a + b) / ratings.length) }))
  }

  render() {
    var modal;
    if (this.state.modalOn) {
      modal = <Modal trackClicks={this.props.trackClicks} productInfo={this.state.productInfo} photos={this.state.styles[this.state.currentStyle].photos} currentPhotoUrl={this.state.currentPhotoUrl} toggleModal={this.toggleModal} changePhoto={this.changePhoto} />
    } else {
      modal = null;
    }
    return (
      <div className='ov-main'>
        {modal}
        <div>
          <Gallery trackClicks={this.props.trackClicks} productInfo={this.state.productInfo} currentPhotoUrl={this.state.currentPhotoUrl} currentPhotoId={this.state.currentPhotoId} prevPhotoUrl={this.state.prevPhotoUrl} prevPhotoId={this.state.prevPhotoId} nextPhotoUrl={this.state.nextPhotoUrl} nextPhotoId={this.state.nextPhotoId} currentStyle={this.state.currentStyle} changePhoto={this.changePhoto} toggleModal={this.toggleModal} maxLength={this.state.maxLength} />
          <Styles trackClicks={this.props.trackClicks} thumbnails={this.state.styles.map(style => style.photos).map(arr => arr[0].thumbnail_url)} changeStyle={this.changeStyle} styles={this.state.styles} />
          <Cart trackClicks={this.props.trackClicks} inventory={Object.entries(this.state.inventory)} addToCart={this.addToCart} />
          <Description productInfo={this.state.productInfo} avgRating={this.state.avgRating} />
        </div>
      </div>
    )
  }
}

export default Overview;