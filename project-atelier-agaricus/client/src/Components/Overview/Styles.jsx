import React from 'react';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div className="ov-styles-container">{this.props.thumbnails ?
      this.props.thumbnails.map((image, id) => {
      return <img className='ov-styles' id={id} height='100px' width='100px' key={'style' + id} src={image} onClick={(e) =>
        {this.props.changeStyle(e);
        this.props.trackClicks(e, 'Overview');
      }} alt={this.props.styles[id].name} title={this.props.styles[id].name}></img>
      }): ''}</div>)
  }
}

export default Styles;