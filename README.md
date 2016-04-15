# react-perfect-grid

React Component for same height items grid (flickr like) :
[demo](pierregoutheraud.github.io/react-perfect-grid)

### Usage

```javascript

// npm install react-perfect-grid --save

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
