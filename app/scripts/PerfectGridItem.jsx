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

    let { H, margins, over, media, ratio, type, element, link } = this.props
    let src = media ? media.src : null

    let height = H
    let width = H*ratio

    let style = {
      height: height + 'px',
      width: width + 'px',
      margin: margins/2 + 'px'
    }

    if (type === 'image') {
      media = <img src={src} />
    } else if (type === 'video'){
      media = <video src={src} controls />
    } else if (type === 'element'){
      // element.style = style
      return (
        <div onClick={onClick} className="perfect-grid__item" style={style}>
          { element }
        </div>
      )
    }

    let onClick = link ? ::this.onClick : null

    // over = over ? <div className="perfect-grid__over" >{ over }</div> : null

    return (
      <div
        className={"perfect-grid__item" + (link ? ' perfect-grid__link' : '')}
        onClick={onClick}
        style={style}
      >
        { over }
        <div
          className={"perfect-grid__media"}
        >
          { media }
        </div>
      </div>
    )
  }

}

export default PerfectGridItem
