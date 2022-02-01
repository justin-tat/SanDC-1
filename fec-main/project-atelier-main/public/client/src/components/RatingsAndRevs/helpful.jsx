import React from 'react'

class Helpful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markedHelpful: false
    }
  }

  handleHelpfulClick() {
    if (!this.state.markedHelpful) {
      this.setState({
        markedHelpful: true
      })
      this.props.markHelpful(this.props.id)
    }
  }


  render() {
    return (
      <div>
        <span>Helpful?</span><span className="link" onClick={this.handleHelpfulClick.bind(this)}> Yes {this.props.helpfulness}</span>
      </div>
    )
  }
}

export default Helpful