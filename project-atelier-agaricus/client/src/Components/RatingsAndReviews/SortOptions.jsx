import React from 'react';

class SortOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const trackClicks = this.props.trackClicks;
    return (
      <div>
        <label>Sort on: </label>
        <select onChange={e => {this.props.changeSort(e); trackClicks(e, 'Reviews');}}>
          <option value="relevant">Relevant</option>
          <option value="newest">Newest</option>
          <option value="helpful">Helpful</option>
        </select>
        <br/>
        <br/>
      </div>
    )
  }
}

export default SortOptions;