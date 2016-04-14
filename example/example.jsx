import './example.scss'

import React from 'react'
import ReactDOM from 'react-dom'
// import PerfectGrid from '../build/react-perfect-grid.js'
import PerfectGrid from '../app/scripts/PerfectGrid.jsx'
import $ from 'jquery'

function fetchTumblr (tumblr) {

  let url = `https://api.tumblr.com/v2/blog/${tumblr}/posts/photo`
  url += `?api_key=rG749jGun3EYRBaiV9outPocSgFpXCblfXgakmGCo14yuGwAu7`;
  url += `&limit=100&offset=0`;
  url += `&callback=?`;

  return $.getJSON(url).then((res) => {

    let posts = res.response.posts,
        images = []

    posts.forEach((post,i) => {
      post.photos.forEach((photo,i) => {
        images.push(photo.original_size.url)
      });
    })

    return images

  })

}

let url = ''
url = 'oxane.tumblr.com'
// url = 'nicolasbessol.tumblr.com'
// url = 'without-coriander-please.tumblr.com'
// url = 'regarderlesfilles.tumblr.com'
fetchTumblr(url).then((images) => {

  console.debug(images.length + ' images fetched from ' + url);

  // Fill items with tumblr images
  let items = images.map((url, i) => {
    return { url }
  })

  items[0].over = (
    <div className={"over"}>
      <h2>Over example</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  )

  items[1].link = 'http://google.fr'
  items[1].over = (
    <div className={"over"}>
      <h2>Click to open link</h2>
    </div>
  )

  // Pre-defined width and height
  items[2].url = 'http://i.telegraph.co.uk/multimedia/archive/02357/eso-summary_2357457k.jpg'
  items[2].width = 300
  items[2].height = 300

  ReactDOM.render(
    <Example items={items} />
    ,document.querySelector('.app')
  )

})

class Example extends React.Component {
  constructor () {
    super()
    this.state = {
      margins: 0,
      maxHeight: $(window).height() * .7
    }
  }

  onChangeMaxHeight (e) {
    let maxHeight = this.refs.inputMaxHeight.value
    this.setState({ maxHeight })
  }

  onChangeMargins (e) {
    let margins = this.refs.inputMargins.value
    this.setState({ margins })
  }

  render () {

    let { margins, maxHeight } = this.state

    return (
      <div className="example">
        <div className="example__settings">
          <fieldset>
            <input type="range" ref="inputMargins" onChange={::this.onChangeMargins} defaultValue="0" min="0" max="300" step="1" />
            <p>Margins: { margins }</p>
          </fieldset>
          <fieldset>
            <input type="range" ref="inputMaxHeight" onChange={::this.onChangeMaxHeight} defaultValue={maxHeight} min="0" max="1000" step="1" />
            <p>Max height: { maxHeight }</p>
          </fieldset>
        </div>
        <PerfectGrid
          items={this.props.items}
          maxHeight={maxHeight}
          margins={margins}
          order={true}
        />
      </div>
    )
  }
}
