import React from 'react'

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: ''
    }
  }

  componentDidMount() {
    let date = this.props.date
    let month = date?.slice(5,7)
    let day
    if (date) {
      if (date[8] === '0') {
        day = date?.slice(9,10)
      } else {
        day = date?.slice(8,10)
      }
    }
    let year = date?.slice(0,4)
    let dateString = ""
    //set month
    if (month === "01") {
      dateString +="January "
    } else if (month === "02") {
      dateString +="February "
    } else if (month === "03") {
      dateString +="March "
    } else if (month === "04") {
      dateString +="April "
    } else if (month === "05") {
      dateString +="May "
    } else if (month === "06") {
      dateString +="June "
    } else if (month === "07") {
      dateString +="July "
    } else if (month === "08") {
      dateString +="August "
    } else if (month === "09") {
      dateString +="September "
    } else if (month === "10") {
      dateString +="October "
    } else if (month === "11") {
      dateString +="November "
    } else if (month === "12") {
      dateString +="December "
    } dateString += `${day}, ${year}`
    this.setState({
      'dateString': dateString
    })
  }

  render() {
    if (!this.state.dateString === "") {
      return (<div></div>)
    } else {
      return (
        <div>
          <p>{this.state.dateString}</p>
        </div>
      )
    }
  }
}

export default Date