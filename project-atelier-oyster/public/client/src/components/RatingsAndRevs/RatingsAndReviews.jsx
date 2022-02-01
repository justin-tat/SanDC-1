import React from 'react'
import Reviews from './reviews.jsx'
import RatingBreakdown from './ratingBreakdown.jsx'
import ProductBreakdown from './productBreakdown.jsx'
import axios from 'axios'


class RatingsAndReviews extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      haveData: false,
      product: 0,
      sort: 'relevant',
      page: 1,
      count: 1000,
      allReviews: [],
      metadata: [],
      filters: [],
      filteredReviews: [],
      name: '',
      markedHelpful: []
    }
    this.getReviewData.bind(this)
    this.filterReviews.bind(this)
    this.updateFilters.bind(this)
    this.postNewReview.bind(this)
    this.removeFilters.bind(this)
    this.markHelpful.bind(this)
  }

  componentDidMount() {
    let id = this.props.id
    this.setState({
      product: id
    })
    this.getReviewData(id, 'relevant', 1, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.filters !== prevState.filters) {
      this.filterReviews()
    } if (this.props.id !== prevProps.id) {
      this.setState({
        product: this.props.id,
        filters: [],
        sort: 'relevant'

      })
      this.getReviewData(this.props.id, this.state.sort, 1, 1000)
    }
  }

  getReviewData(product, sort, page, count) {
    let data = {
      product: product,
      sort: sort,
      page: page,
      count: count
    }
    axios.post('/getreviews', {
      data: data
    })
    .then(result => {
      this.setState({
        allReviews: result.data.results,
        filteredReviews: result.data.results
      })
      this.filterReviews()
    })
    .catch(error => console.log('error!', error))
    let dataForMetadata = {
      product: product,
    }
    axios.post('/getreviewsmetadata', {
      data: dataForMetadata
    })
    .then (result => {
      this.setState({
        metadata: result.data,
        haveData: true
      })
    })
    .catch(error => console.log('error!', error))
  }

  postNewReview(review) {
    axios.post('/newreview', {
      data: review
    })
    .then(result => {
    })
    .catch(error => {
      console.log('error: ', error)
    })
  }

  markHelpful(reviewId) {
    axios.post('/markhelpful', {
      data: reviewId
    })
    .then(result => {
      this.getReviewData(this.state.product, this.state.sort, this.state.page, this.state.count)
    })
    .catch(error => {
      console.log('error:', error)
    })
    this.props.clickTracker('mark review helpful link', 'review.jsx')
  }

  changeSort(sort) {
    this.setState({
      sort: sort
    })
    this.getReviewData(this.state.product, sort, 1, 1000)
  }

  removeFilters() {
    this.setState({
      filters: []
    })
    this.props.clickTracker('remove filters button', 'ratingBreakdown.jsx')
  }

  updateFilters(rating) {
    let currentFilters = Array.from(this.state.filters)
    if (currentFilters.length === 0) {
      currentFilters.push(rating)
    } else {
      let ratingIndex = currentFilters.indexOf(rating)
      //if current filters contain [input rating]
      if (ratingIndex !== -1) {
        //remove current rating from filters
        currentFilters.splice(ratingIndex, 1)
      } else {
        currentFilters.push(rating)
      }
    } this.setState({
        filters: currentFilters
    })

  }
  //review filtering function that will update state with only the reviews to show
  filterReviews() {
    let filters = Array.from(this.state.filters)
    let allReviews = Array.from(this.state.allReviews)
    let filteredReviews = []
    if (filters.length === 0) {
      filteredReviews = allReviews
    } else {
      for (var i = 0; i < allReviews.length; i++) {
        for (var j = 0; j < filters.length; j++) {
          if (allReviews[i].rating === filters[j]) {
            filteredReviews.push(allReviews[i])
          }
        }
      }
    } this.setState({
        filteredReviews: filteredReviews
    })
  }

  render() {
    if (!this.state.haveData) {
      return(<div>
        <p>Loading Reviews</p>
      </div>)
    } else {
    return (
      <div className="ratings-grid-container">
        <Reviews
        reviews={this.state.filteredReviews}
        product={this.state.product}
        name={this.props.name}
        metadata={this.state.metadata}
        changeSort={this.changeSort.bind(this)}
        postNewReview={this.postNewReview.bind(this)}
        markHelpful={this.markHelpful.bind(this)}
        clickTracker={this.props.clickTracker}/>
        <div className="ratings-left-sidebar">
          <RatingBreakdown
          metadata={this.state.metadata}
          updateFilters={this.updateFilters.bind(this)}
          filters={this.state.filters}
          removeFilters={this.removeFilters.bind(this)}
          clickTracker={this.props.clickTracker}/>
          <ProductBreakdown
          metadata={this.state.metadata}
          clickTracker={this.props.clickTracker}/>
        </div>
      </div>
    )
  }
}
}

export default RatingsAndReviews;