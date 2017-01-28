(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RactiveDropdown"] = factory();
	else
		root["RactiveDropdown"] = factory();
})(this, function() {
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
/*!*********************************!*\
  !*** ./src/ractive-dropdown.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	
	__webpack_require__(/*! ./styles.styl */ 1);

	var doc = document, win = window;
	var id = 'ractive-dropdown-container';

	module.exports = Ractive.extend({

		template: __webpack_require__(/*! ./template.html */ 5),

		data: function() {
			return {
	            mode: 'click',
				open: false,
			}
		},

		events: {
			hover: __webpack_require__(/*! ractive-events-hover */ 6)
		},

		onrender: function() {

			var self = this;

			//hoist the dropdowns into a container on the body
			var dropdown = self.find('.dropdown');

			if(!dropdown)
				return;

			var container = doc.getElementById(id);

			if (!container) {
				container = doc.createElement('div');
				container.id = id;
				container.className = 'ractive-dropdown';
				doc.body.appendChild(container);
			}

			container.appendChild(dropdown);

		},

		oncomplete: function() {

			var self = this;

			var el = self.find('*');
			var dropdown = self.find('.dropdown');

			self.docClickHandler = function(e) {

				if(el.contains(e.target) || dropdown.contains(e.target)) {
					return;
				}

				// block clicks to self
				if( event.target.matches('.ractive-dropdown .dropdown')
				   || event.target.matches('.dropdown *') // for other 'dropdowns' like .ractive-select inside this dropdown
				   || !doc.body.contains(event.target))
					return;

				if(el && !el.contains(event.target)) {
					self.set('open', false);
				}

			}


			// update position on scroll
			self.updatePos = function(e) {
				requestAnimationFrame(function() {
					self.updatePosition();
				});
			};

			self.on('click hover', function(details) {
				var event = details.original;
				var mode = self.get('mode');

				// block clicks to self
				if( event.target.matches('.ractive-dropdown .dropdown')
				   || event.target.matches('.ractive-dropdown .dropdown *')
				   || !document.body.contains(event.target))
					return;

				if(details.name == 'hover' && mode == 'hover') {
					self.set('open', details.hover);
				} else if(details.name == 'click') {
					self.toggle('open');
				}

			});

			self.observe('open', function(open) {

				if(open) {

					dropdown.classList.add('open');

					doc.addEventListener('mousedown', self.docClickHandler);
					win.addEventListener('scroll', self.updatePos, true);
					win.addEventListener('resize', self.updatePos, true);

				} else {

					dropdown.classList.remove('open');

					doc.removeEventListener('mousedown', self.docClickHandler);
					win.removeEventListener('scroll', self.updatePos, true);
					win.removeEventListener('resize', self.updatePos, true);

				}

				self.updatePosition();

			}, {init: false});


		},

		updatePosition: function () {

			var self = this;
			var el = self.find('*');
			var dropdown = self.find('.dropdown');

			//TODO different positions like left, top, right, bottom

			var bounds = el.getBoundingClientRect();
			var dropdownBounds = dropdown.getBoundingClientRect();

			var open = self.get('open');

			var left = bounds.left,
				top = bounds.bottom; // default to below
			
			if(left + dropdownBounds.width > win.innerWidth)
				left -= dropdownBounds.width - bounds.width - 5;

			if(top + dropdownBounds.height > win.innerHeight)
				top -= dropdownBounds.height - bounds.height - 5;

			if(!open)
				left = '-9999';

			dropdown.style.left = left + 'px';
			dropdown.style.top = top + 'px';

		},

		open: function(details) {

			//if(details) {
				//var event = details.original;
				//if (event.target.matches('.ractive-select .dropdown *'))
					//return;
			//}

			this.set('open', true);
		},

		close: function(details) {

			this.set('open', false);

		},

		toggle: function(details) {

			var open = this.get('open');

			this.set('open', !open);
		},

		onteardown: function() {

			doc.removeEventListener('mousedown', self.docClickHandler);
			win.removeEventListener('scroll', self.scrollHandler, true);
			win.removeEventListener('resize', self.updatePos, true);

			// have to manually clean this up since we hoisted it from under ractive's nose
			var dropdown = this.find('.dropdown');

			if(dropdown) {
				dropdown.parentNode.removeChild(dropdown);
			}

			var container = doc.getElementById(id);

			if(container && container.childNodes.length == 0) {
				container.parentNode.removeChild(container);
			}

		},


	});


/***/ },
/* 1 */
/*!*************************!*\
  !*** ./src/styles.styl ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(/*! !./../../../../Applications/lib/~/css-loader!./../~/stylus-loader!./styles.styl */ 2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../Applications/lib/~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../Applications/lib/node_modules/css-loader/index.js!./../node_modules/stylus-loader/index.js!./styles.styl", function() {
				var newContent = require("!!./../../../../Applications/lib/node_modules/css-loader/index.js!./../node_modules/stylus-loader/index.js!./styles.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/*!*******************************************************************************************!*\
  !*** /Users/JD/Dropbox/Applications/lib/~/css-loader!./~/stylus-loader!./src/styles.styl ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../Applications/lib/~/css-loader/lib/css-base.js */ 3)();
	// imports


	// module
	exports.push([module.id, ".ractive-dropdown {\n  display: inline-block;\n  user-select: none;\n}\n#ractive-dropdown-container {\n  position: absolute;\n  left: -9999px;\n}\n#ractive-dropdown-container .dropdown {\n  position: fixed;\n  left: -9999px;\n  z-index: 500;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/*!***********************************************************************!*\
  !*** /Users/JD/Dropbox/Applications/lib/~/css-loader/lib/css-base.js ***!
  \***********************************************************************/
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
/* 4 */
/*!**********************************************************************!*\
  !*** /Users/JD/Dropbox/Applications/lib/~/style-loader/addStyles.js ***!
  \**********************************************************************/
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
		if(true) {
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
/* 5 */
/*!***************************!*\
  !*** ./src/template.html ***!
  \***************************/
/***/ function(module, exports) {

	module.exports={"v":4,"t":[{"t":7,"e":"div","m":[{"n":"class","f":["ractive-dropdown ",{"t":2,"r":".class"}],"t":13},{"t":4,"f":[{"n":"style","f":[{"t":2,"r":".style"}],"t":13}],"n":50,"r":".style"},{"n":"class-open","f":[{"t":2,"r":".open"}],"t":13},{"n":"click","f":"click","t":70},{"n":"hover","f":"hover","t":70}],"f":[{"t":16}]}]};

/***/ },
/* 6 */
/*!*****************************************************************!*\
  !*** ./~/ractive-events-hover/dist/ractive-events-hover.umd.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		global.Ractive.events.hover = factory();
	}(this, function () { 'use strict';

		var testDiv = typeof document !== 'undefined' ? document.createElement('div') : {};

		var hover = undefined;

		if (testDiv.onmouseenter !== undefined) {
			// Using native mouseenter/mouseleave events
			hover = function (node, fire) {
				function mouseenterHandler(original) {
					fire({ node: node, original: original, hover: true });
				}

				function mouseleaveHandler(original) {
					fire({ node: node, original: original, hover: false });
				}

				node.addEventListener('mouseenter', mouseenterHandler, false);
				node.addEventListener('mouseleave', mouseleaveHandler, false);

				return {
					teardown: function teardown() {
						node.removeEventListener('mouseenter', mouseenterHandler, false);
						node.removeEventListener('mouseleave', mouseleaveHandler, false);
					}
				};
			};
		} else {
			// using mouseover/mouseout
			hover = function (node, fire) {
				function mouseoverHandler(original) {
					if (node.contains(original.relatedTarget)) return;
					fire({ node: node, original: original, hover: true });
				}

				function mouseoutHandler(original) {
					if (node.contains(original.relatedTarget)) return;
					fire({ node: node, original: original, hover: false });
				}

				node.addEventListener('mouseover', mouseoverHandler, false);
				node.addEventListener('mouseout', mouseoutHandler, false);

				return {
					teardown: function teardown() {
						node.removeEventListener('mouseover', mouseoverHandler, false);
						node.removeEventListener('mouseout', mouseoutHandler, false);
					}
				};
			};
		}

		var hover$1 = hover;

		return hover$1;

	}));

/***/ }
/******/ ])
});
;