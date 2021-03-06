import '../styles/main.scss'
import React from 'react'

import PerfectGridItem from './PerfectGridItem.jsx'
import ScrollBarAdapter from './ScrollBarAdapter.jsx'

// http://blog.vjeux.com/2012/image/image-layout-algorithm-google-plus.html
// H = W / d
// H = W / ( (w1/h1) + (w2/h2) + ... + (wn/hn) )

class PerfectGrid extends React.Component {

  constructor (props) {
    super()
    this.resizeTimeout = null

    let items = props.order ? Array(props.items.length).fill(null) : []

    this.state = {
      items,
      W: 0,
      H: 0,
      d: 0
    }
  }

  getChildContext () {
    return {
      debug: this.props.debug
    }
  }

  componentWillMount () {
    this.loadItems()
  }

  componentDidMount () {
    this.setContainerWidth()

    // window.addEventListener('resize', ::this.setContainerWidth, false);

    /*
    $(window).resize(() => {
      //clearInterval(this.resizeTimeout)
      //this.resizeTimeout = setTimeout(::this.setContainerWidth, 500)
      this.setContainerWidth()
    })
    */
  }

  componentWillUnmount () {
    window.removeEventListener('resize', ::this.setContainerWidth)
  }

  componentWillReceiveProps(nextProps) {

    // console.log('componentWillReceiveProps', nextProps.items);

    let flag = false
    for (let i=0;i< nextProps.items.length;i++) {
      let itemNext = nextProps.items[i],
          item = this.props.items[i]
      if (itemNext.url !== item.url) {
        flag = true
      }
    }

    // if (JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items)) {
    if (flag) {
      this.loadItems(nextProps)
    }
  }

  loadItems(props=this.props) {
    if (this.props.debug) console.debug('Load items', props.items)
    let promises = props.items.map((item, i) => {
      return this.loadItem(item, i)
                 .then(::this.addMedia)
                 .then(::this.setContainerWidth)
    })

    Promise.all(promises).then((images) => {
      if (this.props.success) this.props.success()
      if (this.props.debug) console.debug('All images loaded!')
      // this.setContainerWidth()
    })
  }

  setContainerWidth () {
    if (this.refs.perfectGrid) {
      let W = this.refs.perfectGrid.offsetWidth
      if (W !== this.state.W) {
        if (this.props.debug) console.debug('Setting container width: ' + W)
        this.setState({ W })
      }
    }
  }

  loadItem (item, i) {
    if (item.element) {
      return this.loadElement(item,i)
    }
    else if (this.isImage(item.url)) {
      return this.loadImage(item,i)
    } else {
      return this.loadVideo(item,i)
    }
  }

  loadElement (item,i) {
    return new Promise((resolve, reject) => {
      item.type = 'element'
      resolve({item,i})
    })
  }

  loadVideo (item,i) {
    item.type = 'video'
    return new Promise((resolve, reject) => {
      let video = document.createElement('video')
      video.addEventListener('loadedmetadata', function(e) {
        item.width = video.videoWidth
        item.height = video.videoHeight
        resolve({item,i})
      }, false);
      video.src = item.url
      item.media = video
    })
  }

  loadImage (item,i) {
    item.type = 'image'
    return new Promise((resolve, reject) => {

      // console.log('loadImage', item);
      let image = new Image()

      // If width and height already given
      if (item.width && item.height) {
        image.src = item.url
        item.media = image
        resolve({ item, i })
      } else {
        image.onload = (e) => {
          item.width = image.width
          item.height = image.height
          resolve({item, i})
        }
        image.src = item.url
        item.media = image
      }
    })
  }

  isImage (url) {
    let extensions = ['png', 'jpg', 'jpeg', 'gif']
    let r = new RegExp('\\.' + extensions.join('|'+'\\.'))
    return r.test(url)
  }

  addMedia ({item, i}) {

    let items = this.state.items.concat([]) // TODO: use react-addons-update instead

    // let item = this.props.items[i]
    // item.media = media
    item.ratio = item.width/item.height

    if (this.props.order) {
      items[i] = item
    } else {
      items.push(item)
    }

    this.setState({
      items
    })
    return item

  }

  calculateH (items) {
    let d = 0,
        H = 0

    let { W } = this.state
    let { margins } = this.props

    W -= (items.length+1) * margins

    /*items.forEach((item) => {
      d += item.image.width/item.image.height
    })*/

    d = items.reduce((prev, curr) => {
      return prev + curr.width/curr.height
    }, 0)

    H = W/d

    return H
  }

  render () {

    let { items, W } = this.state
    let { maxHeight, margins, loadingComponent } = this.props

    items = items.filter((item) => { return item !== null }) // retirer les null qui sont remplis de base

    if (!items.length || !this.state.W) {
      return (
        <div className="perfect-grid" ref="perfectGrid" >
          { loadingComponent ? loadingComponent : null }
        </div>
      )
    }

    let imagesRow = [],
        rows = [],
        row

    let perfectGrid = []

    let H = 0,
        slice

    w: while (items.length > 0) {
      for (let i=1; i<items.length+1; ++i) {
        slice = items.slice(0, i)
        H = this.calculateH(slice)
        if (H < maxHeight) {
          rows.push({H, slice})
          items = items.slice(i)
          continue w;
        }
      }
      rows.push({H: Math.min(maxHeight, H), slice})
      break
    }


    rows.forEach((row, i) => {
      row.slice.forEach((item, j) => {
        perfectGrid.push(
          <PerfectGridItem
            key={i+'.'+j}
            H={row.H}
            margins={margins}
            {...item}
          />
        )
      })
    })

    let style = {
      padding: margins/2 + 'px'
    }


    return (
      <div className="perfect-grid" ref="perfectGrid" style={style}>
        <ScrollBarAdapter onResize={::this.setContainerWidth} />
        { perfectGrid }
      </div>
    );

  }
}

PerfectGrid.childContextTypes = {
  debug: React.PropTypes.bool
}

PerfectGrid.defaultProps = {
  margins: 0,
  order: true,
  maxHeight: 300,
  debug: false
}

export default PerfectGrid
