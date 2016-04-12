import '../styles/main.scss'
import React from 'react'

import GridImage from './GridImage.jsx'

// http://blog.vjeux.com/2012/image/image-layout-algorithm-google-plus.html
// H = W / d
// H = W / ( (w1/h1) + (w2/h2) + ... + (wn/hn) )

class GridImages extends React.Component {

  constructor (props) {
    super()
    this.resizeTimeout = null
    this.renderCount = 0

    let images = props.order ? Array(props.images.length).fill(null) : []

    this.state = {
      images,
      W: 0,
      H: 0,
      d: 0
    }
  }

  componentDidMount () {
    this.setContainerWidth()

    window.addEventListener('resize', ::this.setContainerWidth, false);

    /*
    $(window).resize(() => {
      //clearInterval(this.resizeTimeout)
      //this.resizeTimeout = setTimeout(::this.setContainerWidth, 500)
      this.setContainerWidth()
    })
    */
  }

  setContainerWidth () {
    let W = this.refs.gridImages.offsetWidth
    this.setState({ W })
  }

  componentWillMount () {

    let imagesPromises = this.props.images.map((src, i) => {
      return this.createImage(src, i)
                 .then(::this.addImage)
                 //.then(::this.imageLayout)
    })

    Promise.all(imagesPromises).then((images) => {
      console.debug('All images loaded!')
      // console.log(this.state.images)
    })

  }

  createImage (src, i) {
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.onload = (e) => {
        resolve({image, i})
      }
      image.src = src
    })
  }

  addImage ({image, i}) {

    //console.log('addImage', i, image.src)

    let images = this.state.images.concat([]) // TODO: use react-addons-update instead
    image.ratio = image.width/image.height

    if (this.props.order) {
      images[i] = image
    } else {
      images.push(image)
    }

    this.setState({
      images
    })
    return image
  }

  calculateH (images) {
    let d = 0,
        H = 0

    let { W } = this.state
    let { margins } = this.props

    W -= (images.length+1) * margins

    images.forEach((image) => {
      d += image.width/image.height
    })

    d = images.reduce((prev, curr) => {
      return prev + curr.width/curr.height
    }, 0)

    H = W/d

    return H
  }

  render () {

    this.renderCount++

    let { images, W } = this.state
    let { maxHeight, margins, loadingComponent } = this.props

    images = images.filter((image) => { return image !== null }) // retirer les null qui sont remplis de base

    if (!images.length || !this.state.W) {
      return (
        <div className="grid-images" ref="gridImages" >
          { loadingComponent ? loadingComponent : null }
        </div>
      )
    }

    let imagesRow = [],
        rows = [],
        row

    let gridImages = []

    let H = 0,
        slice

    w: while (images.length > 0) {
      for (let i=1; i<images.length+1; ++i) {
        slice = images.slice(0, i)
        H = this.calculateH(slice)
        if (H < maxHeight) {
          rows.push({H, slice})
          images = images.slice(i)
          continue w;
        }
      }
      rows.push({H: Math.min(maxHeight, H), slice})
      break
    }


    rows.forEach((row, i) => {
      row.slice.forEach((image, j) => {
        gridImages.push(
          <GridImage
            key={i+'.'+j}
            image={image}
            H={row.H}
            margins={margins}
          />
        )
      })
    })

    let style = {
      padding: margins/2 + 'px'
    }

    return (
      <div className="grid-images" ref="gridImages" style={style}>
        { gridImages }
      </div>
    );

  }
}

GridImages.defaultProps = {
  margins: 0,
  order: true,
  maxHeight: 300
}

export default GridImages
