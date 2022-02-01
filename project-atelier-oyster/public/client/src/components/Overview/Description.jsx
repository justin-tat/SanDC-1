import React from 'react';

const Description = (props) => {
  const array = props.description.split(/(\?|\.|!|\,)/)
  const slogan = array.slice(0,2).join('')
  const description = array.slice(2).join('')
  // console.log('slogan', slogan)
  // console.log('des', description)
  return (
    <div className="footer">
    <div className="slogan">{slogan}</div>
    <div>{description}</div>
    </div>
  )
}

export default Description;