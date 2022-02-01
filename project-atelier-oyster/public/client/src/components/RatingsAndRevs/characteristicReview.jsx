import React from 'react'

class CharacteristicReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      oneDescription: '',
      twoDescription: '',
      threeDescription: '',
      fourDescription: '',
      fiveDescription: '',
      selection: null
    }
  }

  componentDidMount() {
    if (this.props.thisChar === 'Size') {
      this.setState({
        oneDescription: 'A size too small',
        twoDescription: '1/2 a size too small',
        threeDescription: 'Perfect',
        fourDescription: '1/2 a size too big',
        fiveDescription: 'A size too wide',
        loaded: true
      })
    } else if (this.props.thisChar === 'Width') {
      this.setState({
        oneDescription: 'Too narrow',
        twoDescription: 'Slightly narrow',
        threeDescription: 'Perfect',
        fourDescription: 'Slightly wide',
        fiveDescription: 'Too wide',
        loaded: true
      })
    } else if (this.props.thisChar === 'Comfort') {
      this.setState({
        oneDescription: 'Uncomfortable',
        twoDescription: 'Slightly uncomfortable',
        threeDescription: 'Ok',
        fourDescription: 'Comfortable',
        fiveDescription: 'Perfect',
        loaded: true
      })
    } else if (this.props.thisChar === 'Quality') {
      this.setState({
        oneDescription: 'Poor',
        twoDescription: 'Below average',
        threeDescription: 'What I expected',
        fourDescription: 'Pretty great',
        fiveDescription: 'Perfect',
        loaded: true
      })
    } else if (this.props.thisChar === 'Length') {
      this.setState({
        oneDescription: 'Runs short',
        twoDescription: 'Runs slightly short',
        threeDescription: 'Perfect',
        fourDescription: 'Runs slighly long',
        fiveDescription: 'Runs long',
        loaded: true
      })
    } else if (this.props.thisChar === 'Fit') {
      this.setState({
        oneDescription: 'Runs tight',
        twoDescription: 'Runs slightly tight',
        threeDescription: 'Perfect',
        fourDescription: 'Runs slighly long',
        fiveDescription: 'Runs long',
        loaded: true
      })
    }
  }

  handleClick(e) {
    let rating = parseInt(e.target.value, 10)
    this.setState({
      selection: e.target.value
    })
    this.props.rateChar(this.props.thisChar, rating, this.props.id)
    this.props.clickTracker(`characteristic rating ${this.props.thisChar}: ${rating}`, 'characteristicReview.jsx')
  }

  render() {
    let char = this.props.thisChar
    let oneId = 'one-' + char
    let twoId = 'two-' + char
    let threeId = 'three-' + char
    let fourId = 'four-' + char
    let fiveId = 'five-' + char
    let selection = this.state.selection;
    let selectionDescription
    if (this.state.selection === null) {
      selectionDescription = 'none selected'
    } else if (this.state.selection === '1') {
      selectionDescription = this.state.oneDescription
    } else if (this.state.selection === '2') {
      selectionDescription = this.state.twoDescription
    } else if (this.state.selection === '3') {
      selectionDescription = this.state.threeDescription
    } else if (this.state.selection === '4') {
      selectionDescription = this.state.fourDescription
    } else if (this.state.selection === '5') {
      selectionDescription = this.state.fiveDescription
    }
    return (
      <div>
        <p>{char}*</p>
        <p>{selectionDescription}</p>
        <input type="radio" name={char} id={oneId} value="1" onClick={this.handleClick.bind(this)}></input>
        <input type="radio" name={char} id={twoId}value="2" onClick={this.handleClick.bind(this)}></input>
        <input type="radio" name={char} id={threeId}value="3" onClick={this.handleClick.bind(this)}></input>
        <input type="radio" name={char} id={fourId}value="4" onClick={this.handleClick.bind(this)}></input>
        <input type="radio" name={char} id={fiveId}value="5" onClick={this.handleClick.bind(this)}></input>
        <p>1: {this.state.oneDescription}, 5: {this.state.fiveDescription}</p>
        <br></br>
      </div>
    )
  }
}

export default CharacteristicReview