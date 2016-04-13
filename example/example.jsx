import './example.scss'

import React from 'react'
import ReactDOM from 'react-dom'
// import PerfectGrid from '../build/react-perfect-grid.js'
import PerfectGrid from '../app/scripts/PerfectGrid.jsx'
import $ from 'jquery'

function fetchTumblr (tumblr) {

  let url = `https://api.tumblr.com/v2/blog/${tumblr}/posts/photo`;
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
// url = 'regarderlesfilles.tumblr.com'
fetchTumblr(url).then((images) => {

  // console.log(images);
  // images.forEach((src, i) => { console.log(i, src) })
  // images.unshift('https://i.imgur.com/3YAehPK.gifv')
  images.unshift('http://i.imgur.com/3YAehPK.webm')

  let items = images.map((url, i) => {
    let over = (
      <div className={"over over"+i}>
        <h2>Title {i}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    )
    return {
      url,
      over,   // optional
      // width: 300, // optional
      // height: 400
    }
  })

  ReactDOM.render(
    <PerfectGrid
      items={items}
      maxHeight={$(window).height() * .7}
      margins={0}
      order={true}
    />
    ,document.querySelector('.app')
  )

})
