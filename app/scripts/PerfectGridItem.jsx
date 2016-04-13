import React from 'react'

class PerfectGridItem extends React.Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render () {

    let { H, margins, over, media, ratio, type } = this.props
    let { src } = media

    let height = H
    let width = H*ratio

    let style = {
      height: height + 'px',
      width: width + 'px',
      margin: margins/2 + 'px'
    }

    if (type === 'image') {
      media = <img src={src} />
    } else {
      media = <video src={src} controls />
    }

    return (
      <div className="perfect-grid__item" style={style}>
        { over ? <div className="perfect-grid__over" >{ over }</div> : null }
        <div className="perfect-grid__media" >
          { media }
        </div>
      </div>
    )
  }

}

export default PerfectGridItem
