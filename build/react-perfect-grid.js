(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(2);

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _PerfectGridItem = __webpack_require__(7);

	var _PerfectGridItem2 = _interopRequireDefault(_PerfectGridItem);

	var _ScrollBarAdapter = __webpack_require__(8);

	var _ScrollBarAdapter2 = _interopRequireDefault(_ScrollBarAdapter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// http://blog.vjeux.com/2012/image/image-layout-algorithm-google-plus.html
	// H = W / d
	// H = W / ( (w1/h1) + (w2/h2) + ... + (wn/hn) )

	var PerfectGrid = function (_React$Component) {
	  _inherits(PerfectGrid, _React$Component);

	  function PerfectGrid(props) {
	    _classCallCheck(this, PerfectGrid);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PerfectGrid).call(this));

	    _this.resizeTimeout = null;

	    var items = props.order ? Array(props.items.length).fill(null) : [];

	    _this.state = {
	      items: items,
	      W: 0,
	      H: 0,
	      d: 0
	    };
	    return _this;
	  }

	  _createClass(PerfectGrid, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        debug: this.props.debug
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setContainerWidth();

	      // window.addEventListener('resize', ::this.setContainerWidth, false);

	      /*
	      $(window).resize(() => {
	        //clearInterval(this.resizeTimeout)
	        //this.resizeTimeout = setTimeout(::this.setContainerWidth, 500)
	        this.setContainerWidth()
	      })
	      */
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this.setContainerWidth.bind(this));
	    }
	  }, {
	    key: 'setContainerWidth',
	    value: function setContainerWidth() {
	      if (this.refs.perfectGrid) {
	        var W = this.refs.perfectGrid.offsetWidth;
	        if (W !== this.state.W) {
	          if (this.props.debug) console.debug('Setting container width: ' + W);
	          this.setState({ W: W });
	        }
	      }
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      var promises = this.props.items.map(function (item, i) {
	        return _this2.loadItem(item, i).then(_this2.addMedia.bind(_this2)).then(_this2.setContainerWidth.bind(_this2));
	      });

	      Promise.all(promises).then(function (images) {
	        if (_this2.props.debug) console.debug('All images loaded!');
	        // this.setContainerWidth()
	      });
	    }
	  }, {
	    key: 'loadItem',
	    value: function loadItem(item, i) {
	      if (item.element) {
	        return this.loadElement(item, i);
	      } else if (this.isImage(item.url)) {
	        return this.loadImage(item, i);
	      } else {
	        return this.loadVideo(item, i);
	      }
	    }
	  }, {
	    key: 'loadElement',
	    value: function loadElement(item, i) {
	      return new Promise(function (resolve, reject) {
	        item.type = 'element';
	        resolve({ item: item, i: i });
	      });
	    }
	  }, {
	    key: 'loadVideo',
	    value: function loadVideo(item, i) {
	      item.type = 'video';
	      return new Promise(function (resolve, reject) {
	        var video = document.createElement('video');
	        video.addEventListener('loadedmetadata', function (e) {
	          item.width = video.videoWidth;
	          item.height = video.videoHeight;
	          resolve({ item: item, i: i });
	        }, false);
	        video.src = item.url;
	        item.media = video;
	      });
	    }
	  }, {
	    key: 'loadImage',
	    value: function loadImage(item, i) {
	      item.type = 'image';
	      return new Promise(function (resolve, reject) {

	        // console.log('loadImage', item);
	        var image = new Image();

	        // If width and height already given
	        if (item.width && item.height) {
	          image.src = item.url;
	          item.media = image;
	          resolve({ item: item, i: i });
	        } else {
	          image.onload = function (e) {
	            item.width = image.width;
	            item.height = image.height;
	            resolve({ item: item, i: i });
	          };
	          image.src = item.url;
	          item.media = image;
	        }
	      });
	    }
	  }, {
	    key: 'isImage',
	    value: function isImage(url) {
	      var extensions = ['png', 'jpg', 'jpeg', 'gif'];
	      var r = new RegExp('\\.' + extensions.join('|' + '\\.'));
	      return r.test(url);
	    }
	  }, {
	    key: 'addMedia',
	    value: function addMedia(_ref) {
	      var item = _ref.item;
	      var i = _ref.i;


	      var items = this.state.items.concat([]); // TODO: use react-addons-update instead

	      // let item = this.props.items[i]
	      // item.media = media
	      item.ratio = item.width / item.height;

	      if (this.props.order) {
	        items[i] = item;
	      } else {
	        items.push(item);
	      }

	      this.setState({
	        items: items
	      });
	      return item;
	    }
	  }, {
	    key: 'calculateH',
	    value: function calculateH(items) {
	      var d = 0,
	          H = 0;

	      var W = this.state.W;
	      var margins = this.props.margins;


	      W -= (items.length + 1) * margins;

	      /*items.forEach((item) => {
	        d += item.image.width/item.image.height
	      })*/

	      d = items.reduce(function (prev, curr) {
	        return prev + curr.width / curr.height;
	      }, 0);

	      H = W / d;

	      return H;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state;
	      var items = _state.items;
	      var W = _state.W;
	      var _props = this.props;
	      var maxHeight = _props.maxHeight;
	      var margins = _props.margins;
	      var loadingComponent = _props.loadingComponent;


	      items = items.filter(function (item) {
	        return item !== null;
	      }); // retirer les null qui sont remplis de base

	      if (!items.length || !this.state.W) {
	        return _react2.default.createElement(
	          'div',
	          { className: 'perfect-grid', ref: 'perfectGrid' },
	          loadingComponent ? loadingComponent : null
	        );
	      }

	      var imagesRow = [],
	          rows = [],
	          row = void 0;

	      var perfectGrid = [];

	      var H = 0,
	          slice = void 0;

	      w: while (items.length > 0) {
	        for (var i = 1; i < items.length + 1; ++i) {
	          slice = items.slice(0, i);
	          H = this.calculateH(slice);
	          if (H < maxHeight) {
	            rows.push({ H: H, slice: slice });
	            items = items.slice(i);
	            continue w;
	          }
	        }
	        rows.push({ H: Math.min(maxHeight, H), slice: slice });
	        break;
	      }

	      rows.forEach(function (row, i) {
	        row.slice.forEach(function (item, j) {
	          perfectGrid.push(_react2.default.createElement(_PerfectGridItem2.default, _extends({
	            key: i + '.' + j,
	            H: row.H,
	            margins: margins
	          }, item)));
	        });
	      });

	      var style = {
	        padding: margins / 2 + 'px'
	      };

	      return _react2.default.createElement(
	        'div',
	        { className: 'perfect-grid', ref: 'perfectGrid', style: style },
	        _react2.default.createElement(_ScrollBarAdapter2.default, { onResize: this.setContainerWidth.bind(this) }),
	        perfectGrid
	      );
	    }
	  }]);

	  return PerfectGrid;
	}(_react2.default.Component);

	PerfectGrid.childContextTypes = {
	  debug: _react2.default.PropTypes.bool
	};

	PerfectGrid.defaultProps = {
	  margins: 0,
	  order: true,
	  maxHeight: 300,
	  debug: false
	};

	exports.default = PerfectGrid;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".perfect-grid {\n  box-sizing: border-box;\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  max-width: 100%;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-line-pack: start;\n      align-content: flex-start; }\n  .perfect-grid *, .perfect-grid *:before, .perfect-grid *:after {\n    box-sizing: inherit; }\n  .perfect-grid__link {\n    cursor: pointer; }\n  .perfect-grid__rows {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n  .perfect-grid__row {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n  .perfect-grid__item {\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    overflow: hidden; }\n    .perfect-grid__item > * {\n      z-index: 2; }\n  .perfect-grid__media {\n    position: relative;\n    z-index: 1;\n    width: 100%;\n    height: 100%; }\n    .perfect-grid__media img, .perfect-grid__media video {\n      display: block;\n      height: 100%;\n      position: relative;\n      z-index: 1;\n      background-color: black; }\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PerfectGridItem = function (_React$Component) {
	  _inherits(PerfectGridItem, _React$Component);

	  function PerfectGridItem() {
	    _classCallCheck(this, PerfectGridItem);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PerfectGridItem).call(this));

	    _this.state = {};
	    return _this;
	  }

	  _createClass(PerfectGridItem, [{
	    key: 'onClick',
	    value: function onClick(e) {
	      window.open(this.props.link);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var H = _props.H;
	      var margins = _props.margins;
	      var over = _props.over;
	      var media = _props.media;
	      var ratio = _props.ratio;
	      var type = _props.type;
	      var element = _props.element;
	      var link = _props.link;

	      var src = media ? media.src : null;

	      var height = H;
	      var width = H * ratio;

	      var style = {
	        height: height + 'px',
	        width: width + 'px',
	        margin: margins / 2 + 'px'
	      };

	      if (type === 'image') {
	        media = _react2.default.createElement('img', { src: src });
	      } else if (type === 'video') {
	        media = _react2.default.createElement('video', { src: src, controls: true });
	      } else if (type === 'element') {
	        // element.style = style
	        return _react2.default.createElement(
	          'div',
	          { onClick: onClick, className: 'perfect-grid__item', style: style },
	          element
	        );
	      }

	      var onClick = link ? this.onClick.bind(this) : null;

	      // over = over ? <div className="perfect-grid__over" >{ over }</div> : null

	      return _react2.default.createElement(
	        'div',
	        {
	          className: "perfect-grid__item" + (link ? ' perfect-grid__link' : ''),
	          onClick: onClick,
	          style: style
	        },
	        over,
	        _react2.default.createElement(
	          'div',
	          {
	            className: "perfect-grid__media"
	          },
	          media
	        )
	      );
	    }
	  }]);

	  return PerfectGridItem;
	}(_react2.default.Component);

	exports.default = PerfectGridItem;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Detect when scrollbar appears
	var ScrollBarAdapter = _react2.default.createClass({
	    displayName: 'ScrollBarAdapter',
	    onResize: function onResize() {
	        if (this.props.onResize) {
	            this.props.onResize();
	            return;
	        }
	        try {
	            var evt = new UIEvent('resize');
	            window.dispatchEvent(evt);
	        } catch (e) {}
	    },
	    componentDidMount: function componentDidMount() {
	        this.refs.frame.contentWindow.addEventListener('resize', this.onResize, false);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        this.refs.frame.contentWindow.removeEventListener('resize', this.onResize);
	    },
	    render: function render() {
	        var styles = {
	            position: "absolute",
	            top: 0,
	            height: 0,
	            left: 0,
	            margin: 0,
	            padding: 0,
	            overflow: "hidden",
	            borderWidth: 0,
	            backgroundColor: "transparent",
	            width: "100%",
	            visibility: 'hidden'
	        };
	        return _react2.default.createElement('iframe', { classNames: 'ScrollBarAdapter', ref: 'frame', style: styles });
	    }
	});

	exports.default = ScrollBarAdapter;

/***/ }
/******/ ])
});
;