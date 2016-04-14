import React from 'react'

class PerfectGridItem extends React.Component {

  constructor () {
    super()
    this.state = {
    }
  }

  onClick (e) {
    window.open(this.props.link)
  }

  render () {

    let { H, margins, over, media, ratio, type } = this.props
    let { src } = media

    let height = H
    let width = H*ratio

    let style = {
      height: Math.floor(height) + 'px',
      width: Math.floor(width) + 'px',
      margin: margins/2 + 'px'
    }

    if (type === 'image') {
      media = <img src={src} />
    } else {
      media = <video src={src} controls />
    }

    let onClick = this.props.link ? ::this.onClick : null

    return (
      <div onClick={onClick} className="perfect-grid__item" style={style}>
        { over ? <div className="perfect-grid__over" >{ over }</div> : null }
        <div className="perfect-grid__media" >
          { media }
        </div>
      </div>
    )
  }

}

export default PerfectGridItem
