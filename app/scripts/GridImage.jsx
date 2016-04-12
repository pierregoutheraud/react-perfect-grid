import React from 'react'

class GridImage extends React.Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render () {

    let { H, margins } = this.props
    let { src, ratio } = this.props.image

    let height = H
    let width = H*ratio

    // console.log(height, width);

    let style = {
      height: height + 'px',
      width: width + 'px',
      margin: margins/2 + 'px'
      //padding: margins/2 + 'px'
    }

    // height -= margins
    // width -= margins

    let imgStyle = {
      //height: height + 'px',
      //width: width + 'px',
    }

    return (
      <div className="grid-images__image" style={style}>
        <img src={src} style={imgStyle} />
      </div>
    )
  }

}

export default GridImage
