import React from 'react'
import ReactDOM from 'react-dom'
import PerfectGrid from '../build/react-perfect-grid.js'
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

function fetchSubreddit (url) {
  return $.getJSON(url).then((res) => {

    let images = res.data.children

    images = images.map((image) => {
      console.log(image.data.url);
      return image.data.url
    })

    return images
  })
}

let url = ''
url = 'oxane.tumblr.com'
// url = 'regarderlesfilles.tumblr.com'
// url = 'cinqfruits.tumblr.com'
// url = 'https://www.reddit.com/r/NSFW_GIF/top.json?sort=top&limit=100&t=day&count=0'
// fetchSubreddit(url).then((images) => {
fetchTumblr(url).then((images) => {

  console.log(images);

  //console.log('fetch tumblr')
  // images.forEach((src, i) => { console.log(i, src) })

  ReactDOM.render(
    <PerfectGrid
      images={images}
      maxHeight={$(window).height() * .7}
      margins={0}
      order={false}
    />,
    document.querySelector('.app')
  )

})
