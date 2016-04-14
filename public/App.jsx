import './main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
// import PerfectGrid from '../build/react-perfect-grid.js'
import PerfectGrid from '../app/scripts/PerfectGrid.jsx'
import $ from 'jquery'

import GistEmbed from './GistEmbed.jsx'

function fetchTumblr (tumblr, page=1) {

  let limit = 100

  let url = `https://api.tumblr.com/v2/blog/${tumblr}/posts/photo`
  url += `?api_key=rG749jGun3EYRBaiV9outPocSgFpXCblfXgakmGCo14yuGwAu7`;
  url += `&limit=${limit}&offset=${(page-1)*limit}`;
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

// function nextPage({images,page, url}) {
  // page++
  // return fetchTumblr(url, page).then(({imagesNext, pageNext}) => {
    // console.log(imagesNext, pageNext);
    // return {images: images.concat(imagesNext), page: pageNext}
  // })
// }

let ps = []
for (let i=1;i<=5;i++) {
  ps.push(fetchTumblr(url,i))
}

Promise.all(ps).then((array) => {

  let images = []

  array.forEach((i) => {
    images = images.concat(i)
  })

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

  ReactDOM.render (
    <Example items={items} />,
    document.querySelector('.app')
  )

})

class Example extends React.Component {
  constructor () {
    super()
    this.state = {
      margins: 0,
      maxHeight: Math.floor($(window).height() * .7)
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
        <div className="example__title">
          <h1>React Perfect Grid</h1>
          <p>React Component for same height items grid (Flickr like)</p>
          <div className="example__links">
            <a href="https://github.com/pierregoutheraud/react-perfect-grid" target="_blank">Github</a>
            <iframe src="https://ghbtns.com/github-btn.html?user=pierregoutheraud&repo=react-perfect-grid&type=star&count=true" frameBorder="0" scrolling="0" width="100px" height="20px"></iframe>
          </div>
        </div>

        <div className="example__usage">
          <h2>Usage</h2>
          <GistEmbed gist="7f7136927595d34e17ab5faef4689dfc" />
        </div>

        <div className="example__settings">
          <h2>Demo</h2>
          <form>
            <fieldset>
              <input type="range" ref="inputMargins" onChange={::this.onChangeMargins} defaultValue={margins} min="0" max="300" step="1" />
              <p>Margins: <span>{ margins }</span></p>
            </fieldset>
            <fieldset>
              <input type="range" ref="inputMaxHeight" onChange={::this.onChangeMaxHeight} defaultValue={maxHeight} min="0" max="1200" step="1" />
              <p>Row height: <span>{ maxHeight }</span></p>
            </fieldset>
          </form>
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