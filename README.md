# react-perfect-grid

React Component for same height items grid (flickr like) :
<a href="http://pierregoutheraud.github.io/react-perfect-grid" target="_blank" >demo</a>

![alt text](https://s3.amazonaws.com/f.cl.ly/items/0z3B333s242B3R1J022k/Screen%20Recording%202016-04-15%20at%2004.21%20PM.gif?v=c8a1e366 "demo react perfect grid")

### Install

```
npm install react-perfect-grid --save
```

### Usage

```javascript

import PerfectGrid from 'react-perfect-grid'

let items = [
  { url: 'http://www.website.com/image1.jpg' },
  { url: 'http://www.website.com/image2.jpg' },
  { url: 'http://www.website.com/image3.jpg' },
  {
    url: 'http://www.website.com/image4.jpg',
    link: 'http://www.website.com/image4.jpg', // optional
    over: <div>Your text</div>, // optional
    width: 300, // optional
    height: 300 // optional
  }
]

ReactDOM.render (
  <PerfectGrid
    items={items}
    maxHeight={300}  // maximum height of row
    margins={20}     // margins in pixels
    order={true}     // keep images order or not
  />,
  document.querySelector('.app')
)

```
