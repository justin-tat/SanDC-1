// const axios = require('axios')
// var token = require('../../../dist/config.js')

// getProductData(id)  {
//   let productUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`
//   let ratingsUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?&product_id=${id}`
//   let stylesUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`
//   let headers = {
//     'Authorization': token.TOKEN
//   }
// axios.get(productUrl, {headers})
// .then(result => {
//   console.log('product by id', result.data)
//   this.setState({
//     'product': result.data
//   })
// })
// .then(() => {
//   axios.get(ratingsUrl, {headers})
//   .then(result => {
//     console.log('ratings data', result.data)
//     this.setState({
//       'ratings': result.data.ratings
//     })
//   })
// })
// .then(() => {
//  axios.get(stylesUrl, {headers})
//  .then(result => {
//    console.log('result from styles', result.data.results)
//    this.setState({
//      'styles': result.data.results,
//      'hasData': true
//    })
//  })
// })
// .catch(err =>
//   console.log('error in get product by id')
// )
// }

// module.exports = getProductData

