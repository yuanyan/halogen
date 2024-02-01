require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js":[function(require,module,exports){
'use strict';

var getVendorPropertyName = require('./getVendorPropertyName');

module.exports = function(target, sources) {
  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  var prefixed = {};
  for (var key in to) {
    prefixed[getVendorPropertyName(key)] = to[key]
  }

  return prefixed
}

},{"./getVendorPropertyName":"/Users/yuanyan/React/halogen/node_modules/domkit/getVendorPropertyName.js"}],"/Users/yuanyan/React/halogen/node_modules/domkit/builtinStyle.js":[function(require,module,exports){
'use strict';

module.exports = document.createElement('div').style;

},{}],"/Users/yuanyan/React/halogen/node_modules/domkit/getVendorPrefix.js":[function(require,module,exports){
'use strict';

var cssVendorPrefix;

module.exports = function() {

  if (cssVendorPrefix) return cssVendorPrefix;

  var styles = window.getComputedStyle(document.documentElement, '');
  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];

  return cssVendorPrefix = '-' + pre + '-';
}

},{}],"/Users/yuanyan/React/halogen/node_modules/domkit/getVendorPropertyName.js":[function(require,module,exports){
'use strict';

var builtinStyle = require('./builtinStyle');
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
var domVendorPrefix;

// Helper function to get the proper vendor property name. (transition => WebkitTransition)
module.exports = function(prop, isSupportTest) {

  var vendorProp;
  if (prop in builtinStyle) return prop;

  var UpperProp = prop.charAt(0).toUpperCase() + prop.substr(1);

  if (domVendorPrefix) {

    vendorProp = domVendorPrefix + UpperProp;
    if (vendorProp in builtinStyle) {
      return vendorProp;
    }
  } else {

    for (var i = 0; i < prefixes.length; ++i) {
      vendorProp = prefixes[i] + UpperProp;
      if (vendorProp in builtinStyle) {
        domVendorPrefix = prefixes[i];
        return vendorProp;
      }
    }
  }

  // if support test, not fallback to origin prop name
  if (!isSupportTest) {
    return prop;
  }

}

},{"./builtinStyle":"/Users/yuanyan/React/halogen/node_modules/domkit/builtinStyle.js"}],"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js":[function(require,module,exports){
'use strict';

var insertRule = require('./insertRule');
var vendorPrefix = require('./getVendorPrefix')();
var index = 0;

module.exports = function(keyframes) {
  // random name
  var name = 'anim_' + (++index) + (+new Date);
  var css = "@" + vendorPrefix + "keyframes " + name + " {";

  for (var key in keyframes) {
    css += key + " {";

    for (var property in keyframes[key]) {
      var part = ":" + keyframes[key][property] + ";";
      // We do vendor prefix for every property
      css += vendorPrefix + property + part;
      css += property + part;
    }

    css += "}";
  }

  css += "}";

  insertRule(css);

  return name
}

},{"./getVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/getVendorPrefix.js","./insertRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertRule.js"}],"/Users/yuanyan/React/halogen/node_modules/domkit/insertRule.js":[function(require,module,exports){
'use strict';

var extraSheet;

module.exports = function(css) {

  if (!extraSheet) {
    // First time, create an extra stylesheet for adding rules
    extraSheet = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(extraSheet);
    // Keep reference to actual StyleSheet object (`styleSheet` for IE < 9)
    extraSheet = extraSheet.sheet || extraSheet.styleSheet;
  }

  var index = (extraSheet.cssRules || extraSheet.rules).length;
  extraSheet.insertRule(css, index);

  return extraSheet;
}

},{}],"/Users/yuanyan/React/halogen/src/BeatLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '50%': {
        transform: 'scale(0.75)',
        opacity: 0.2
    },
    '100%': {
        transform: 'scale(1)',
        opacity: 1
    }
};

var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function getBallStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '0.7s', i % 2 ? '0s' : '0.35s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement('div', { style: this.getStyle(1) }),
                React.createElement('div', { style: this.getStyle(2) }),
                React.createElement('div', { style: this.getStyle(3) })
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/BounceLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '0%, 100%': {
        transform: 'scale(0)'
    },
    '50%': {
        transform: 'scale(1.0)'
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '60px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function getBallStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            borderRadius: '100%',
            opacity: 0.6,
            position: 'absolute',
            top: 0,
            left: 0,
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '2s', i == 1 ? '1s' : '0s', 'infinite', 'ease-in-out'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        if (i) {
            return assign(this.getBallStyle(i), this.getAnimationStyle(i));
        }

        return assign({
            width: this.props.size,
            height: this.props.size,
            position: 'relative'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: this.getStyle() },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) })
                )
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/ClipLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '0%': {
        transform: 'rotate(0deg) scale(1)'
    },
    '50%': {
        transform: 'rotate(180deg) scale(0.8)'
    },
    '100%': {
        transform: 'rotate(360deg) scale(1)'
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '35px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function getBallStyle() {
        return {
            width: this.props.size,
            height: this.props.size,
            border: '2px solid',
            borderColor: this.props.color,
            borderBottomColor: 'transparent',
            borderRadius: '100%',
            background: 'transparent !important',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '0.75s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement('div', { style: this.getStyle() })
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/DotLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var rotateKeyframes = {
    '100%': {
        transform: 'rotate(360deg)'
    }
};

/**
 * @type {Object}
 */
var bounceKeyframes = {
    '0%, 100%': {
        transform: 'scale(0)'
    },
    '50%': {
        transform: 'scale(1.0)'
    }
};

/**
 * @type {String}
 */
var rotateAnimationName = insertKeyframesRule(rotateKeyframes);

/**
 * @type {String}
 */
var bounceAnimationName = insertKeyframesRule(bounceKeyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '60px'
        };
    },

    /**
     * @param  {String} size
     * @return {Object}
     */
    getBallStyle: function getBallStyle(size) {
        return {
            backgroundColor: this.props.color,
            width: size,
            height: size,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [i == 0 ? rotateAnimationName : bounceAnimationName, '2s', i == 2 ? '-1s' : '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        var size = parseInt(this.props.size);
        var ballSize = size / 2;

        if (i) {
            return assign(this.getBallStyle(ballSize), this.getAnimationStyle(i), {
                position: 'absolute',
                top: i % 2 ? 0 : 'auto',
                bottom: i % 2 ? 'auto' : 0
            });
        }

        return assign(this.getAnimationStyle(i), {
            width: size,
            height: size,
            position: 'relative'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: this.getStyle(0) },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) })
                )
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/FadeLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '50%': {
        opacity: 0.3
    },
    '100%': {
        opacity: 1
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        height: React.PropTypes.string,
        width: React.PropTypes.string,
        margin: React.PropTypes.string,
        radius: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            height: '15px',
            width: '5px',
            margin: '2px',
            radius: '2px'
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getLineStyle: function getLineStyle(i) {
        return {
            backgroundColor: this.props.color,
            height: this.props.height,
            width: this.props.width,
            margin: this.props.margin,
            borderRadius: this.props.radius,
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '1.2s', i * 0.12 + 's', 'infinite', 'ease-in-out'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getPosStyle: function getPosStyle(i) {
        var radius = '20';
        var quarter = radius / 2 + radius / 5.5;

        var lines = {
            l1: {
                top: radius,
                left: 0
            },
            l2: {
                top: quarter,
                left: quarter,
                transform: 'rotate(-45deg)'
            },
            l3: {
                top: 0,
                left: radius,
                transform: 'rotate(90deg)'
            },
            l4: {
                top: -quarter,
                left: quarter,
                transform: 'rotate(45deg)'
            },
            l5: {
                top: -radius,
                left: 0
            },
            l6: {
                top: -quarter,
                left: -quarter,
                transform: 'rotate(-45deg)'
            },
            l7: {
                top: 0,
                left: -radius,
                transform: 'rotate(90deg)'
            },
            l8: {
                top: quarter,
                left: -quarter,
                transform: 'rotate(45deg)'
            }
        };

        return lines['l' + i];
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getLineStyle(i), this.getPosStyle(i), this.getAnimationStyle(i), {
            position: 'absolute'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            var style = {
                position: 'relative',
                fontSize: 0
            };

            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: style },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) }),
                    React.createElement('div', { style: this.getStyle(3) }),
                    React.createElement('div', { style: this.getStyle(4) }),
                    React.createElement('div', { style: this.getStyle(5) }),
                    React.createElement('div', { style: this.getStyle(6) }),
                    React.createElement('div', { style: this.getStyle(7) }),
                    React.createElement('div', { style: this.getStyle(8) })
                )
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/GridLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '0%': {
        transform: 'scale(1)'
    },
    '50%': {
        transform: 'scale(0.5)',
        opacity: 0.7
    },
    '100%': {
        transform: 'scale(1)',
        opacity: 1
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

/**
 * @param  {Number} top
 * @return {Number}
 */
function random(top) {
    return Math.random() * top;
}

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function getBallStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animationDuration = random(100) / 100 + 0.6 + 's';
        var animationDelay = random(100) / 100 - 0.2 + 's';

        var animation = [animationName, animationDuration, animationDelay, 'infinite', 'ease'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            var style = {
                width: parseFloat(this.props.size) * 3 + parseFloat(this.props.margin) * 6,
                fontSize: 0
            };

            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: style },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) }),
                    React.createElement('div', { style: this.getStyle(3) }),
                    React.createElement('div', { style: this.getStyle(4) }),
                    React.createElement('div', { style: this.getStyle(5) }),
                    React.createElement('div', { style: this.getStyle(6) }),
                    React.createElement('div', { style: this.getStyle(7) }),
                    React.createElement('div', { style: this.getStyle(8) }),
                    React.createElement('div', { style: this.getStyle(9) })
                )
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/MoonLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '100%': {
        transform: 'rotate(360deg)'
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '60px'
        };
    },

    /**
     * @param  {String} size
     * @return {Object}
     */
    getBallStyle: function getBallStyle(size) {
        return {
            width: size,
            height: size,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '0.6s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        var size = parseInt(this.props.size);
        var moonSize = size / 7;

        if (i == 1) {
            return assign(this.getBallStyle(moonSize), this.getAnimationStyle(i), {
                backgroundColor: this.props.color,
                opacity: '0.8',
                position: 'absolute',
                top: size / 2 - moonSize / 2
            });
        } else if (i == 2) {
            return assign(this.getBallStyle(size), {
                border: moonSize + 'px solid ' + this.props.color,
                opacity: 0.1
            });
        } else {
            return assign(this.getAnimationStyle(i), {
                position: 'relative'
            });
        }
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: this.getStyle(0) },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) })
                )
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/PacmanLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var animations = {};

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.number,
        margin: React.PropTypes.number
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: 25,
            margin: 2
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function getBallStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var size = this.props.size;
        var animationName = animations[size];

        if (!animationName) {
            var keyframes = {
                '75%': {
                    opacity: 0.7
                },
                '100%': {
                    transform: 'translate(' + -4 * size + 'px,' + -size / 4 + 'px)'
                }
            };
            animationName = animations[size] = insertKeyframesRule(keyframes);
        }

        var animation = [animationName, '1s', i * 0.25 + 's', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        if (i == 1) {
            var s1 = this.props.size + 'px solid transparent';
            var s2 = this.props.size + 'px solid ' + this.props.color;

            return {
                width: 0,
                height: 0,
                borderRight: s1,
                borderTop: s2,
                borderLeft: s2,
                borderBottom: s2,
                borderRadius: this.props.size
            };
        }

        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            width: 10,
            height: 10,
            transform: 'translate(0, ' + -this.props.size / 4 + 'px)',
            position: 'absolute',
            top: 25,
            left: 100
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            var style = {
                position: 'relative',
                fontSize: 0
            };

            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: style },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) }),
                    React.createElement('div', { style: this.getStyle(3) }),
                    React.createElement('div', { style: this.getStyle(4) }),
                    React.createElement('div', { style: this.getStyle(5) })
                )
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/PulseLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '0%': {
        transform: 'scale(1)',
        opacity: 1
    },
    '45%': {
        transform: 'scale(0.1)',
        opacity: 0.7
    },
    '80%': {
        transform: 'scale(1)',
        opacity: 1
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function getBallStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '0.75s', i * 0.12 + 's', 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement('div', { style: this.getStyle(1) }),
                React.createElement('div', { style: this.getStyle(2) }),
                React.createElement('div', { style: this.getStyle(3) })
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/RingLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var rightRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'

    },
    '100%': {
        transform: 'rotateX(180deg) rotateY(360deg) rotateZ(360deg)'
    }
};

/**
 * @type {Object}
 */
var leftRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    },
    '100%': {
        transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)'
    }
};

/**
 * @type {String}
 */
var rightRotateAnimationName = insertKeyframesRule(rightRotateKeyframes);

/**
 * @type {String}
 */
var leftRotateAnimationName = insertKeyframesRule(leftRotateKeyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '60px'
        };
    },

    /**
     * @param {String} size
     * @return {Object}
     */
    getCircleStyle: function getCircleStyle(size) {
        return {
            width: size,
            height: size,
            border: size / 10 + 'px solid ' + this.props.color,
            opacity: 0.4,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [i == 1 ? rightRotateAnimationName : leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';
        var perspective = '800px';

        return {
            perspective: perspective,
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        var size = parseInt(this.props.size);

        if (i) {
            return assign(this.getCircleStyle(size), this.getAnimationStyle(i), {
                position: 'absolute',
                top: 0,
                left: 0
            });
        }

        return {
            width: size,
            height: size,
            position: 'relative'
        };
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: this.getStyle(0) },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) })
                )
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/RiseLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Number}
 */
var riseAmount = 30;

/**
 * @type {Object}
 */
var keyframesEven = {
    '0%': {
        transform: 'scale(1.1)'
    },
    '25': {
        transform: 'translateY(-' + riseAmount + 'px)'
    },
    '50%': {
        transform: 'scale(0.4)'
    },
    '75%': {
        transform: 'translateY(' + riseAmount + 'px)'
    },
    '100%': {
        transform: 'translateY(0) scale(1.0)'
    }
};

/**
 * @type {Object}
 */
var keyframesOdd = {
    '0%': {
        transform: 'scale(0.4)'
    },
    '25': {
        transform: 'translateY(' + riseAmount + 'px)'
    },
    '50%': {
        transform: 'scale(1.1)'
    },
    '75%': {
        transform: 'translateY(-' + riseAmount + 'px)'
    },
    '100%': {
        transform: 'translateY(0) scale(0.75)'
    }
};

/**
 * @type {String}
 */
var animationNameEven = insertKeyframesRule(keyframesEven);

/**
 * @type {String}
 */
var animationNameOdd = insertKeyframesRule(keyframesOdd);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function getBallStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [i % 2 == 0 ? animationNameEven : animationNameOdd, '1s', '0s', 'infinite', 'cubic-bezier(.15,.46,.9,.6)'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement('div', { style: this.getStyle(1) }),
                React.createElement('div', { style: this.getStyle(2) }),
                React.createElement('div', { style: this.getStyle(3) }),
                React.createElement('div', { style: this.getStyle(4) }),
                React.createElement('div', { style: this.getStyle(5) })
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/RotateLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '0%': {
        transform: 'rotate(0deg)'
    },
    '50%': {
        transform: 'rotate(180deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function getBallStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '1s', '0s', 'infinite', 'cubic-bezier(.7,-.13,.22,.86)'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        if (i) {
            return assign(this.getBallStyle(i), {
                opacity: '0.8',
                position: 'absolute',
                top: 0,
                left: i % 2 ? -28 : 25
            });
        }

        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block',
            position: 'relative'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement(
                    'div',
                    { style: this.getStyle() },
                    React.createElement('div', { style: this.getStyle(1) }),
                    React.createElement('div', { style: this.getStyle(2) })
                )
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/ScaleLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '0%': {
        transform: 'scaley(1.0)'
    },
    '50%': {
        transform: 'scaley(0.4)'
    },
    '100%': {
        transform: 'scaley(1.0)'
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        height: React.PropTypes.string,
        width: React.PropTypes.string,
        margin: React.PropTypes.string,
        radius: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            height: '35px',
            width: '4px',
            margin: '2px',
            radius: '2px'
        };
    },

    /**
     * @return {Object}
     */
    getLineStyle: function getLineStyle() {
        return {
            backgroundColor: this.props.color,
            height: this.props.height,
            width: this.props.width,
            margin: this.props.margin,
            borderRadius: this.props.radius,
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '1s', i * 0.1 + 's', 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getLineStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement('div', { style: this.getStyle(1) }),
                React.createElement('div', { style: this.getStyle(2) }),
                React.createElement('div', { style: this.getStyle(3) }),
                React.createElement('div', { style: this.getStyle(4) }),
                React.createElement('div', { style: this.getStyle(5) })
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/SkewLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '25%': {
        transform: 'perspective(100px) rotateX(180deg) rotateY(0)'
    },
    '50%': {
        transform: 'perspective(100px) rotateX(180deg) rotateY(180deg)'
    },
    '75%': {
        transform: 'perspective(100px) rotateX(0) rotateY(180deg)'
    },
    '100%': {
        transform: 'perspective(100px) rotateX(0) rotateY(0)'
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '20px'
        };
    },

    /**
     * @return {Object}
     */
    getSharpStyle: function getSharpStyle() {
        return {
            width: 0,
            height: 0,
            borderLeft: this.props.size + ' solid transparent',
            borderRight: this.props.size + ' solid transparent',
            borderBottom: this.props.size + ' solid ' + this.props.color,
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '3s', '0s', 'infinite', 'cubic-bezier(.09,.57,.49,.9)'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getSharpStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement('div', { style: this.getStyle() })
            );
        };

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/SquareLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '25%': {
        transform: 'rotateX(180deg) rotateY(0)'
    },
    '50%': {
        transform: 'rotateX(180deg) rotateY(180deg)'
    },
    '75%': {
        transform: 'rotateX(0) rotateY(180deg)'
    },
    '100%': {
        transform: 'rotateX(0) rotateY(0)'
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '50px'
        };
    },

    /**
     * @return {Object}
     */
    getSquareStyle: function getSquareStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '3s', '0s', 'infinite', 'cubic-bezier(.09,.57,.49,.9)'].join(' ');
        var animationFillMode = 'both';
        var perspective = '100px';

        return {
            perspective: perspective,
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getSquareStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement('div', { style: this.getStyle() })
            );
        }

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/SyncLoader.js":[function(require,module,exports){
'use strict';

var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '33%': {
        transform: 'translateY(10px)'
    },
    '66%': {
        transform: 'translateY(-10px)'
    },
    '100%': {
        transform: 'translateY(0)'
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    displayName: 'Loader',

    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            loading: true,
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function getBallStyle() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function getAnimationStyle(i) {
        var animation = [animationName, '0.6s', i * 0.07 + 's', 'infinite', 'ease-in-out'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function getStyle(i) {
        return assign(this.getBallStyle(i), this.getAnimationStyle(i), {
            display: 'inline-block'
        });
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function renderLoader(loading) {
        if (loading) {
            return React.createElement(
                'div',
                { id: this.props.id, className: this.props.className },
                React.createElement('div', { style: this.getStyle(1) }),
                React.createElement('div', { style: this.getStyle(2) }),
                React.createElement('div', { style: this.getStyle(3) })
            );
        };

        return null;
    },

    render: function render() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;

},{"domkit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/domkit/appendVendorPrefix.js","domkit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/domkit/insertKeyframesRule.js","react":false}],"halogen":[function(require,module,exports){
'use strict';

module.exports = {
    PulseLoader: require('./PulseLoader'),
    RotateLoader: require('./RotateLoader'),
    BeatLoader: require('./BeatLoader'),
    RiseLoader: require('./RiseLoader'),
    SyncLoader: require('./SyncLoader'),
    GridLoader: require('./GridLoader'),
    ClipLoader: require('./ClipLoader'),
    SquareLoader: require('./SquareLoader'),
    DotLoader: require('./DotLoader'),
    PacmanLoader: require('./PacmanLoader'),
    MoonLoader: require('./MoonLoader'),
    RingLoader: require('./RingLoader'),
    BounceLoader: require('./BounceLoader'),
    SkewLoader: require('./SkewLoader'),
    FadeLoader: require('./FadeLoader'),
    ScaleLoader: require('./ScaleLoader')
};

},{"./BeatLoader":"/Users/yuanyan/React/halogen/src/BeatLoader.js","./BounceLoader":"/Users/yuanyan/React/halogen/src/BounceLoader.js","./ClipLoader":"/Users/yuanyan/React/halogen/src/ClipLoader.js","./DotLoader":"/Users/yuanyan/React/halogen/src/DotLoader.js","./FadeLoader":"/Users/yuanyan/React/halogen/src/FadeLoader.js","./GridLoader":"/Users/yuanyan/React/halogen/src/GridLoader.js","./MoonLoader":"/Users/yuanyan/React/halogen/src/MoonLoader.js","./PacmanLoader":"/Users/yuanyan/React/halogen/src/PacmanLoader.js","./PulseLoader":"/Users/yuanyan/React/halogen/src/PulseLoader.js","./RingLoader":"/Users/yuanyan/React/halogen/src/RingLoader.js","./RiseLoader":"/Users/yuanyan/React/halogen/src/RiseLoader.js","./RotateLoader":"/Users/yuanyan/React/halogen/src/RotateLoader.js","./ScaleLoader":"/Users/yuanyan/React/halogen/src/ScaleLoader.js","./SkewLoader":"/Users/yuanyan/React/halogen/src/SkewLoader.js","./SquareLoader":"/Users/yuanyan/React/halogen/src/SquareLoader.js","./SyncLoader":"/Users/yuanyan/React/halogen/src/SyncLoader.js"}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZG9ta2l0L2FwcGVuZFZlbmRvclByZWZpeC5qcyIsIm5vZGVfbW9kdWxlcy9kb21raXQvYnVpbHRpblN0eWxlLmpzIiwibm9kZV9tb2R1bGVzL2RvbWtpdC9nZXRWZW5kb3JQcmVmaXguanMiLCJub2RlX21vZHVsZXMvZG9ta2l0L2dldFZlbmRvclByb3BlcnR5TmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9kb21raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZS5qcyIsIm5vZGVfbW9kdWxlcy9kb21raXQvaW5zZXJ0UnVsZS5qcyIsIkJlYXRMb2FkZXIuanMiLCJCb3VuY2VMb2FkZXIuanMiLCJDbGlwTG9hZGVyLmpzIiwiRG90TG9hZGVyLmpzIiwiRmFkZUxvYWRlci5qcyIsIkdyaWRMb2FkZXIuanMiLCJNb29uTG9hZGVyLmpzIiwiUGFjbWFuTG9hZGVyLmpzIiwiUHVsc2VMb2FkZXIuanMiLCJSaW5nTG9hZGVyLmpzIiwiUmlzZUxvYWRlci5qcyIsIlJvdGF0ZUxvYWRlci5qcyIsIlNjYWxlTG9hZGVyLmpzIiwiU2tld0xvYWRlci5qcyIsIlNxdWFyZUxvYWRlci5qcyIsIlN5bmNMb2FkZXIuanMiLCJIYWxvZ2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7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LDZCQUFLLE9BQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFQLEVBQUwsQ0FESjtnQkFFSSw2QkFBSyxPQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUCxFQUFMLENBRko7Z0JBR0ksNkJBQUssT0FBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsRUFBTCxDQUhKO2FBREosQ0FEUztTQUFiLENBRDRCOztBQVc1QixlQUFPLElBQVAsQ0FYNEI7S0FBbEI7O0FBY2QsWUFBUSxrQkFBVztBQUNmLGVBQU8sS0FBSyxZQUFMLENBQWtCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBekIsQ0FEZTtLQUFYO0NBbkZDLENBQVQ7O0FBd0ZKLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7QUNoSEEsT0FBTyxPQUFQLEdBQWlCO0FBQ2IsaUJBQWEsUUFBUSxlQUFSLENBQWI7QUFDQSxrQkFBYyxRQUFRLGdCQUFSLENBQWQ7QUFDQSxnQkFBWSxRQUFRLGNBQVIsQ0FBWjtBQUNBLGdCQUFZLFFBQVEsY0FBUixDQUFaO0FBQ0EsZ0JBQVksUUFBUSxjQUFSLENBQVo7QUFDQSxnQkFBWSxRQUFRLGNBQVIsQ0FBWjtBQUNBLGdCQUFZLFFBQVEsY0FBUixDQUFaO0FBQ0Esa0JBQWMsUUFBUSxnQkFBUixDQUFkO0FBQ0EsZUFBVyxRQUFRLGFBQVIsQ0FBWDtBQUNBLGtCQUFjLFFBQVEsZ0JBQVIsQ0FBZDtBQUNBLGdCQUFZLFFBQVEsY0FBUixDQUFaO0FBQ0EsZ0JBQVksUUFBUSxjQUFSLENBQVo7QUFDQSxrQkFBYyxRQUFRLGdCQUFSLENBQWQ7QUFDQSxnQkFBWSxRQUFRLGNBQVIsQ0FBWjtBQUNBLGdCQUFZLFFBQVEsY0FBUixDQUFaO0FBQ0EsaUJBQWEsUUFBUSxlQUFSLENBQWI7Q0FoQkoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0VmVuZG9yUHJvcGVydHlOYW1lID0gcmVxdWlyZSgnLi9nZXRWZW5kb3JQcm9wZXJ0eU5hbWUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgIGlmIChuZXh0U291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcHJlZml4ZWQgPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIHRvKSB7XG4gICAgcHJlZml4ZWRbZ2V0VmVuZG9yUHJvcGVydHlOYW1lKGtleSldID0gdG9ba2V5XVxuICB9XG5cbiAgcmV0dXJuIHByZWZpeGVkXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjc3NWZW5kb3JQcmVmaXg7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKGNzc1ZlbmRvclByZWZpeCkgcmV0dXJuIGNzc1ZlbmRvclByZWZpeDtcblxuICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnJyk7XG4gIHZhciBwcmUgPSAoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc3R5bGVzKS5qb2luKCcnKS5tYXRjaCgvLShtb3p8d2Via2l0fG1zKS0vKSB8fCAoc3R5bGVzLk9MaW5rID09PSAnJyAmJiBbJycsICdvJ10pKVsxXTtcblxuICByZXR1cm4gY3NzVmVuZG9yUHJlZml4ID0gJy0nICsgcHJlICsgJy0nO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYnVpbHRpblN0eWxlID0gcmVxdWlyZSgnLi9idWlsdGluU3R5bGUnKTtcbnZhciBwcmVmaXhlcyA9IFsnTW96JywgJ1dlYmtpdCcsICdPJywgJ21zJ107XG52YXIgZG9tVmVuZG9yUHJlZml4O1xuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSBwcm9wZXIgdmVuZG9yIHByb3BlcnR5IG5hbWUuICh0cmFuc2l0aW9uID0+IFdlYmtpdFRyYW5zaXRpb24pXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHByb3AsIGlzU3VwcG9ydFRlc3QpIHtcblxuICB2YXIgdmVuZG9yUHJvcDtcbiAgaWYgKHByb3AgaW4gYnVpbHRpblN0eWxlKSByZXR1cm4gcHJvcDtcblxuICB2YXIgVXBwZXJQcm9wID0gcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc3Vic3RyKDEpO1xuXG4gIGlmIChkb21WZW5kb3JQcmVmaXgpIHtcblxuICAgIHZlbmRvclByb3AgPSBkb21WZW5kb3JQcmVmaXggKyBVcHBlclByb3A7XG4gICAgaWYgKHZlbmRvclByb3AgaW4gYnVpbHRpblN0eWxlKSB7XG4gICAgICByZXR1cm4gdmVuZG9yUHJvcDtcbiAgICB9XG4gIH0gZWxzZSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2ZW5kb3JQcm9wID0gcHJlZml4ZXNbaV0gKyBVcHBlclByb3A7XG4gICAgICBpZiAodmVuZG9yUHJvcCBpbiBidWlsdGluU3R5bGUpIHtcbiAgICAgICAgZG9tVmVuZG9yUHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICAgIHJldHVybiB2ZW5kb3JQcm9wO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHN1cHBvcnQgdGVzdCwgbm90IGZhbGxiYWNrIHRvIG9yaWdpbiBwcm9wIG5hbWVcbiAgaWYgKCFpc1N1cHBvcnRUZXN0KSB7XG4gICAgcmV0dXJuIHByb3A7XG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5zZXJ0UnVsZSA9IHJlcXVpcmUoJy4vaW5zZXJ0UnVsZScpO1xudmFyIHZlbmRvclByZWZpeCA9IHJlcXVpcmUoJy4vZ2V0VmVuZG9yUHJlZml4JykoKTtcbnZhciBpbmRleCA9IDA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5ZnJhbWVzKSB7XG4gIC8vIHJhbmRvbSBuYW1lXG4gIHZhciBuYW1lID0gJ2FuaW1fJyArICgrK2luZGV4KSArICgrbmV3IERhdGUpO1xuICB2YXIgY3NzID0gXCJAXCIgKyB2ZW5kb3JQcmVmaXggKyBcImtleWZyYW1lcyBcIiArIG5hbWUgKyBcIiB7XCI7XG5cbiAgZm9yICh2YXIga2V5IGluIGtleWZyYW1lcykge1xuICAgIGNzcyArPSBrZXkgKyBcIiB7XCI7XG5cbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBrZXlmcmFtZXNba2V5XSkge1xuICAgICAgdmFyIHBhcnQgPSBcIjpcIiArIGtleWZyYW1lc1trZXldW3Byb3BlcnR5XSArIFwiO1wiO1xuICAgICAgLy8gV2UgZG8gdmVuZG9yIHByZWZpeCBmb3IgZXZlcnkgcHJvcGVydHlcbiAgICAgIGNzcyArPSB2ZW5kb3JQcmVmaXggKyBwcm9wZXJ0eSArIHBhcnQ7XG4gICAgICBjc3MgKz0gcHJvcGVydHkgKyBwYXJ0O1xuICAgIH1cblxuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGNzcyArPSBcIn1cIjtcblxuICBpbnNlcnRSdWxlKGNzcyk7XG5cbiAgcmV0dXJuIG5hbWVcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV4dHJhU2hlZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY3NzKSB7XG5cbiAgaWYgKCFleHRyYVNoZWV0KSB7XG4gICAgLy8gRmlyc3QgdGltZSwgY3JlYXRlIGFuIGV4dHJhIHN0eWxlc2hlZXQgZm9yIGFkZGluZyBydWxlc1xuICAgIGV4dHJhU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoZXh0cmFTaGVldCk7XG4gICAgLy8gS2VlcCByZWZlcmVuY2UgdG8gYWN0dWFsIFN0eWxlU2hlZXQgb2JqZWN0IChgc3R5bGVTaGVldGAgZm9yIElFIDwgOSlcbiAgICBleHRyYVNoZWV0ID0gZXh0cmFTaGVldC5zaGVldCB8fCBleHRyYVNoZWV0LnN0eWxlU2hlZXQ7XG4gIH1cblxuICB2YXIgaW5kZXggPSAoZXh0cmFTaGVldC5jc3NSdWxlcyB8fCBleHRyYVNoZWV0LnJ1bGVzKS5sZW5ndGg7XG4gIGV4dHJhU2hlZXQuaW5zZXJ0UnVsZShjc3MsIGluZGV4KTtcblxuICByZXR1cm4gZXh0cmFTaGVldDtcbn1cbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnZG9ta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdkb21raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG4vKipcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBrZXlmcmFtZXMgPSB7XG4gICAgJzUwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMC43NSknLFxuICAgICAgICBvcGFjaXR5OiAwLjJcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxKScsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9XG59O1xuXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogJzE1cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMnB4J1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJyxcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IHRoaXMucHJvcHMudmVydGljYWxBbGlnblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcwLjdzJywgaSUyPyAnMHMnOiAnMC4zNXMnLCAnaW5maW5pdGUnLCAnbGluZWFyJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldFN0eWxlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb2FkaW5nXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnQgfHwgbnVsbH1cbiAgICAgKi9cbiAgICByZW5kZXJMb2FkZXI6IGZ1bmN0aW9uKGxvYWRpbmcpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMSl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDIpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgzKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxvYWRlcih0aGlzLnByb3BzLmxvYWRpbmcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnZG9ta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdkb21raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG4vKipcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBrZXlmcmFtZXMgPSB7XG4gICAgJzAlLCAxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEuMCknXG4gICAgfVxufTtcblxuLyoqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICc2MHB4J1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnLFxuICAgICAgICAgICAgb3BhY2l0eTogMC42LFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogdGhpcy5wcm9wcy52ZXJ0aWNhbEFsaWduXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcycycsIGk9PTE/ICcxcyc6ICcwcycsICdpbmZpbml0ZScsICdlYXNlLWluLW91dCddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb2FkaW5nXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnQgfHwgbnVsbH1cbiAgICAgKi9cbiAgICByZW5kZXJMb2FkZXI6IGZ1bmN0aW9uKGxvYWRpbmcpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDEpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMil9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTG9hZGVyKHRoaXMucHJvcHMubG9hZGluZyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdkb21raXQvYXBwZW5kVmVuZG9yUHJlZml4Jyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJ2RvbWtpdC9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbi8qKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKSBzY2FsZSgxKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgxODBkZWcpIHNjYWxlKDAuOCknXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDM2MGRlZykgc2NhbGUoMSknXG4gICAgfVxufTtcblxuLyoqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICczNXB4J1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGJvcmRlcjogJzJweCBzb2xpZCcsXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbUNvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTAwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQgIWltcG9ydGFudCcsXG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiB0aGlzLnByb3BzLnZlcnRpY2FsQWxpZ25cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzAuNzVzJywgJzBzJywgJ2luZmluaXRlJywgJ2xpbmVhciddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb2FkaW5nXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnQgfHwgbnVsbH1cbiAgICAgKi9cbiAgICByZW5kZXJMb2FkZXI6IGZ1bmN0aW9uKGxvYWRpbmcpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxvYWRlcih0aGlzLnByb3BzLmxvYWRpbmcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnZG9ta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdkb21raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG4vKipcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciByb3RhdGVLZXlmcmFtZXMgPSB7XG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpJ1xuICAgIH1cbn07XG5cbi8qKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGJvdW5jZUtleWZyYW1lcyA9IHtcbiAgICAnMCUsIDEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDApJ1xuICAgIH0sXG4gICAgJzUwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMS4wKSdcbiAgICB9XG59O1xuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciByb3RhdGVBbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShyb3RhdGVLZXlmcmFtZXMpO1xuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBib3VuY2VBbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShib3VuY2VLZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnNjBweCdcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBzaXplXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEJhbGxTdHlsZTogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJyxcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IHRoaXMucHJvcHMudmVydGljYWxBbGlnblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFtpPT0wID8gcm90YXRlQW5pbWF0aW9uTmFtZSA6IGJvdW5jZUFuaW1hdGlvbk5hbWUsICcycycsIGk9PTI/ICctMXMnOiAnMHMnLCAnaW5maW5pdGUnLCAnbGluZWFyJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnZm9yd2FyZHMnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIHNpemUgPSBwYXJzZUludCh0aGlzLnByb3BzLnNpemUpO1xuICAgICAgICB2YXIgYmFsbFNpemUgPSBzaXplLzI7XG5cbiAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoYmFsbFNpemUpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBpJTI/IDA6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiBpJTI/ICdhdXRvJzogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogc2l6ZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gbG9hZGluZ1xuICAgICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50IHx8IG51bGx9XG4gICAgICovXG4gICAgcmVuZGVyTG9hZGVyOiBmdW5jdGlvbihsb2FkaW5nKSB7XG4gICAgICAgIGlmIChsb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMucHJvcHMuaWR9IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDApfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMSl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgyKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMb2FkZXIodGhpcy5wcm9wcy5sb2FkaW5nKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2RvbWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnZG9ta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxuLyoqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICc1MCUnOiB7XG4gICAgICAgIG9wYWNpdHk6IDAuM1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9XG59O1xuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICByYWRpdXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGhlaWdodDogJzE1cHgnLFxuICAgICAgICAgICAgd2lkdGg6ICc1cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMnB4JyxcbiAgICAgICAgICAgIHJhZGl1czogJzJweCdcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldExpbmVTdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhpcy5wcm9wcy5yYWRpdXMsXG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiB0aGlzLnByb3BzLnZlcnRpY2FsQWxpZ25cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzEuMnMnLCAoaSAqIDAuMTIpICsgJ3MnLCAnaW5maW5pdGUnLCAnZWFzZS1pbi1vdXQnXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldFBvc1N0eWxlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciByYWRpdXMgPSAnMjAnO1xuICAgICAgICB2YXIgcXVhcnRlciA9IChyYWRpdXMgLyAyKSArIChyYWRpdXMgLyA1LjUpO1xuXG4gICAgICAgIHZhciBsaW5lcyA9IHtcbiAgICAgICAgICAgIGwxOiB7XG4gICAgICAgICAgICAgICAgdG9wOiByYWRpdXMsXG4gICAgICAgICAgICAgICAgbGVmdDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGwyOiB7XG4gICAgICAgICAgICAgICAgdG9wOiBxdWFydGVyLFxuICAgICAgICAgICAgICAgIGxlZnQ6IHF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKC00NWRlZyknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDM6IHtcbiAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgbGVmdDogcmFkaXVzLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IC1xdWFydGVyLFxuICAgICAgICAgICAgICAgIGxlZnQ6IHF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDQ1ZGVnKSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsNToge1xuICAgICAgICAgICAgICAgIHRvcDogLXJhZGl1cyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDY6IHtcbiAgICAgICAgICAgICAgICB0b3A6IC1xdWFydGVyLFxuICAgICAgICAgICAgICAgIGxlZnQ6IC1xdWFydGVyLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgtNDVkZWcpJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGw3OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgIGxlZnQ6IC1yYWRpdXMsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsODoge1xuICAgICAgICAgICAgICAgIHRvcDogcXVhcnRlcixcbiAgICAgICAgICAgICAgICBsZWZ0OiAtcXVhcnRlcixcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoNDVkZWcpJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBsaW5lc1snbCcraV07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRTdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRMaW5lU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldFBvc1N0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb2FkaW5nXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnQgfHwgbnVsbH1cbiAgICAgKi9cbiAgICByZW5kZXJMb2FkZXI6IGZ1bmN0aW9uKGxvYWRpbmcpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgxKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDIpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMyl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSg0KX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDUpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoNil9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSg3KX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDgpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxvYWRlcih0aGlzLnByb3BzLmxvYWRpbmcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnZG9ta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdkb21raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG4vKipcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBrZXlmcmFtZXMgPSB7XG4gICAgJzAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDAuNSknLFxuICAgICAgICBvcGFjaXR5OiAwLjdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxKScsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9XG59O1xuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG4vKipcbiAqIEBwYXJhbSAge051bWJlcn0gdG9wXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHJhbmRvbSh0b3ApIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIHRvcFxufVxuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogdGhpcy5wcm9wcy52ZXJ0aWNhbEFsaWduXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uRHVyYXRpb24gPSAoKHJhbmRvbSgxMDApIC8gMTAwKSArIDAuNikgKyAncyc7XG4gICAgICAgIHZhciBhbmltYXRpb25EZWxheSA9ICgocmFuZG9tKDEwMCkgLyAxMDApIC0gMC4yKSArICdzJztcblxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsIGFuaW1hdGlvbkR1cmF0aW9uLCBhbmltYXRpb25EZWxheSwgJ2luZmluaXRlJywgJ2Vhc2UnXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldFN0eWxlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gbG9hZGluZ1xuICAgICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50IHx8IG51bGx9XG4gICAgICovXG4gICAgcmVuZGVyTG9hZGVyOiBmdW5jdGlvbihsb2FkaW5nKSB7XG4gICAgICAgIGlmIChsb2FkaW5nKSB7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IChwYXJzZUZsb2F0KHRoaXMucHJvcHMuc2l6ZSkgKiAzKSArIHBhcnNlRmxvYXQodGhpcy5wcm9wcy5tYXJnaW4pICogNixcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgxKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDIpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMyl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSg0KX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDUpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoNil9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSg3KX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDgpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoOSl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTG9hZGVyKHRoaXMucHJvcHMubG9hZGluZyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdkb21raXQvYXBwZW5kVmVuZG9yUHJlZml4Jyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJ2RvbWtpdC9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbi8qKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDM2MGRlZyknXG4gICAgfVxufTtcblxuLyoqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogJzYwcHgnXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gc2l6ZVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTAwJScsXG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiB0aGlzLnByb3BzLnZlcnRpY2FsQWxpZ25cbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzAuNnMnLCAnMHMnLCAnaW5maW5pdGUnLCAnbGluZWFyJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnZm9yd2FyZHMnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIHNpemUgPSBwYXJzZUludCh0aGlzLnByb3BzLnNpemUpO1xuICAgICAgICB2YXIgbW9vblNpemUgPSBzaXplLzc7XG5cbiAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShtb29uU2l6ZSksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogJzAuOCcsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHNpemUvMiAtIG1vb25TaXplLzJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGkgPT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShzaXplKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogbW9vblNpemUgKydweCBzb2xpZCAnICsgdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4xXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb2FkaW5nXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnQgfHwgbnVsbH1cbiAgICAgKi9cbiAgICByZW5kZXJMb2FkZXI6IGZ1bmN0aW9uKGxvYWRpbmcpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgxKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDIpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxvYWRlcih0aGlzLnByb3BzLmxvYWRpbmcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnZG9ta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdkb21raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG4vKipcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBhbmltYXRpb25zID0ge307XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgLyoqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgbG9hZGluZzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXJcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6IDI1LFxuICAgICAgICAgICAgbWFyZ2luOiAyXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogdGhpcy5wcm9wcy52ZXJ0aWNhbEFsaWduXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMucHJvcHMuc2l6ZTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbk5hbWUgPSBhbmltYXRpb25zW3NpemVdO1xuXG4gICAgICAgIGlmICghIGFuaW1hdGlvbk5hbWUpIHtcbiAgICAgICAgICAgIHZhciBrZXlmcmFtZXMgPSB7XG4gICAgICAgICAgICAgICAgJzc1JSc6IHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC43XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnMTAwJSc6IHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyAoLTQgKiBzaXplKSArICdweCwnICsgKC1zaXplIC8gNCkgKyAncHgpJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbmltYXRpb25OYW1lID0gYW5pbWF0aW9uc1tzaXplXSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzFzJywgaSowLjI1ICsgJ3MnLCAnaW5maW5pdGUnLCAnbGluZWFyJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRTdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICB2YXIgczEgPSAgdGhpcy5wcm9wcy5zaXplICsgJ3B4IHNvbGlkIHRyYW5zcGFyZW50JztcbiAgICAgICAgICAgIHZhciBzMiA9ICB0aGlzLnByb3BzLnNpemUgKyAncHggc29saWQgJyArIHRoaXMucHJvcHMuY29sb3I7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlclJpZ2h0OiBzMSxcbiAgICAgICAgICAgICAgICBib3JkZXJUb3A6IHMyLFxuICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IHMyLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogczIsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnByb3BzLnNpemVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAnKyAtdGhpcy5wcm9wcy5zaXplIC8gNCArICdweCknLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIHRvcDogMjUsXG4gICAgICAgICAgICAgICAgbGVmdDogMTAwXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGxvYWRpbmdcbiAgICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudCB8fCBudWxsfVxuICAgICAqL1xuICAgIHJlbmRlckxvYWRlcjogZnVuY3Rpb24obG9hZGluZykge1xuICAgICAgICBpZiAobG9hZGluZykge1xuICAgICAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAwXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMucHJvcHMuaWR9IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDEpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDIpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDMpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDQpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDUpfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMb2FkZXIodGhpcy5wcm9wcy5sb2FkaW5nKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2RvbWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnZG9ta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxuLyoqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfSxcbiAgICAnNDUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjEpJyxcbiAgICAgICAgb3BhY2l0eTogMC43XG4gICAgfSxcbiAgICAnODAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxKScsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9XG59O1xuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogdGhpcy5wcm9wcy52ZXJ0aWNhbEFsaWduXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcwLjc1cycsIChpICogMC4xMikgKyAncycsICdpbmZpbml0ZScsICdjdWJpYy1iZXppZXIoLjIsLjY4LC4xOCwxLjA4KSddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb2FkaW5nXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnQgfHwgbnVsbH1cbiAgICAgKi9cbiAgICByZW5kZXJMb2FkZXI6IGZ1bmN0aW9uKGxvYWRpbmcpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMSl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDIpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgzKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxvYWRlcih0aGlzLnByb3BzLmxvYWRpbmcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnZG9ta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdkb21raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG4vKipcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciByaWdodFJvdGF0ZUtleWZyYW1lcyA9IHtcbiAgICAnMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoMGRlZykgcm90YXRlWSgwZGVnKSByb3RhdGVaKDBkZWcpJ1xuXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMzYwZGVnKSByb3RhdGVaKDM2MGRlZyknXG4gICAgfVxufTtcblxuLyoqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgbGVmdFJvdGF0ZUtleWZyYW1lcyA9IHtcbiAgICAnMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoMGRlZykgcm90YXRlWSgwZGVnKSByb3RhdGVaKDBkZWcpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDE4MGRlZykgcm90YXRlWigzNjBkZWcpJ1xuICAgIH1cbn07XG5cbi8qKlxuICogQHR5cGUge1N0cmluZ31cbiAqL1xudmFyIHJpZ2h0Um90YXRlQW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUocmlnaHRSb3RhdGVLZXlmcmFtZXMpO1xuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBsZWZ0Um90YXRlQW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUobGVmdFJvdGF0ZUtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgLyoqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgbG9hZGluZzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICc2MHB4J1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRDaXJjbGVTdHlsZTogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICAgICAgICBib3JkZXI6IHNpemUvMTAgKydweCBzb2xpZCAnICsgdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNCxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogdGhpcy5wcm9wcy52ZXJ0aWNhbEFsaWduXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2k9PTE/IHJpZ2h0Um90YXRlQW5pbWF0aW9uTmFtZTogbGVmdFJvdGF0ZUFuaW1hdGlvbk5hbWUsICcycycsICcwcycsICdpbmZpbml0ZScsICdsaW5lYXInXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdmb3J3YXJkcyc7XG4gICAgICAgIHZhciBwZXJzcGVjdGl2ZSA9ICc4MDBweCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBlcnNwZWN0aXZlOiBwZXJzcGVjdGl2ZSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRTdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgc2l6ZSA9IHBhcnNlSW50KHRoaXMucHJvcHMuc2l6ZSk7XG5cbiAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDaXJjbGVTdHlsZShzaXplKSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb2FkaW5nXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnQgfHwgbnVsbH1cbiAgICAgKi9cbiAgICByZW5kZXJMb2FkZXI6IGZ1bmN0aW9uKGxvYWRpbmcpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgxKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDIpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxvYWRlcih0aGlzLnByb3BzLmxvYWRpbmcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnZG9ta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdkb21raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG4vKipcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbnZhciByaXNlQW1vdW50ID0gMzA7XG5cbi8qKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGtleWZyYW1lc0V2ZW4gPSB7XG4gICAgJzAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLjEpJ1xuICAgIH0sXG4gICAgJzI1Jzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0nICsgcmlzZUFtb3VudCArICdweCknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjQpJ1xuICAgIH0sXG4gICAgJzc1JSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgnICsgcmlzZUFtb3VudCArICdweCknXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSBzY2FsZSgxLjApJ1xuICAgIH1cbn07XG5cbi8qKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGtleWZyYW1lc09kZCA9IHtcbiAgICAnMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDAuNCknXG4gICAgfSxcbiAgICAnMjUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArIHJpc2VBbW91bnQgKyAncHgpJ1xuICAgIH0sXG4gICAgJzUwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMS4xKSdcbiAgICB9LFxuICAgICc3NSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLScgKyByaXNlQW1vdW50ICsgJ3B4KSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApIHNjYWxlKDAuNzUpJ1xuICAgIH1cbn07XG5cbi8qKlxuICogQHR5cGUge1N0cmluZ31cbiAqL1xudmFyIGFuaW1hdGlvbk5hbWVFdmVuID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXNFdmVuKTtcblxuLyoqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG52YXIgYW5pbWF0aW9uTmFtZU9kZCA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzT2RkKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogJzE1cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMnB4J1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJyxcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IHRoaXMucHJvcHMudmVydGljYWxBbGlnblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFtpJTI9PTA/IGFuaW1hdGlvbk5hbWVFdmVuOiBhbmltYXRpb25OYW1lT2RkLCAnMXMnLCAnMHMnLCAnaW5maW5pdGUnLCAnY3ViaWMtYmV6aWVyKC4xNSwuNDYsLjksLjYpJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRTdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGxvYWRpbmdcbiAgICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudCB8fCBudWxsfVxuICAgICAqL1xuICAgIHJlbmRlckxvYWRlcjogZnVuY3Rpb24obG9hZGluZykge1xuICAgICAgICBpZiAobG9hZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgxKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMil9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDMpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSg0KX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoNSl9PjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMb2FkZXIodGhpcy5wcm9wcy5sb2FkaW5nKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2RvbWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnZG9ta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxuLyoqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJ1xuICAgIH0sXG4gICAgJzUwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDM2MGRlZyknXG4gICAgfVxufTtcblxuLyoqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogJzE1cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMnB4J1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJyxcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IHRoaXMucHJvcHMudmVydGljYWxBbGlnblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnMXMnLCAnMHMnLCAnaW5maW5pdGUnLCAnY3ViaWMtYmV6aWVyKC43LC0uMTMsLjIyLC44NiknXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRTdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjgnLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBpJTIgPyAtMjggOiAyNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGxvYWRpbmdcbiAgICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudCB8fCBudWxsfVxuICAgICAqL1xuICAgIHJlbmRlckxvYWRlcjogZnVuY3Rpb24obG9hZGluZykge1xuICAgICAgICBpZiAobG9hZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMSl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgyKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMb2FkZXIodGhpcy5wcm9wcy5sb2FkaW5nKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2RvbWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnZG9ta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxuLyoqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGV5KDEuMCknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZXkoMC40KSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZXkoMS4wKSdcbiAgICB9XG59O1xuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICByYWRpdXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGhlaWdodDogJzM1cHgnLFxuICAgICAgICAgICAgd2lkdGg6ICc0cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMnB4JyxcbiAgICAgICAgICAgIHJhZGl1czogJzJweCdcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldExpbmVTdHlsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXG4gICAgICAgICAgICBtYXJnaW46IHRoaXMucHJvcHMubWFyZ2luLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnByb3BzLnJhZGl1cyxcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IHRoaXMucHJvcHMudmVydGljYWxBbGlnblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnMXMnLCAoaSAqIDAuMSkgKyAncycsICdpbmZpbml0ZScsICdjdWJpYy1iZXppZXIoLjIsLjY4LC4xOCwxLjA4KSddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0TGluZVN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb2FkaW5nXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnQgfHwgbnVsbH1cbiAgICAgKi9cbiAgICByZW5kZXJMb2FkZXI6IGZ1bmN0aW9uKGxvYWRpbmcpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMSl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDIpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgzKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoNCl9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDUpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTG9hZGVyKHRoaXMucHJvcHMubG9hZGluZyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdkb21raXQvYXBwZW5kVmVuZG9yUHJlZml4Jyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJ2RvbWtpdC9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbi8qKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMjUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMCknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMTgwZGVnKSdcbiAgICB9LFxuICAgICc3NSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApIHJvdGF0ZVkoMTgwZGVnKSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgwKSByb3RhdGVZKDApJ1xuICAgIH1cbn07XG5cbi8qKlxuICogQHR5cGUge1N0cmluZ31cbiAqL1xudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgLyoqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgbG9hZGluZzogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMjBweCdcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldFNoYXJwU3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICBib3JkZXJMZWZ0OiB0aGlzLnByb3BzLnNpemUgKyAnIHNvbGlkIHRyYW5zcGFyZW50JyxcbiAgICAgICAgICAgIGJvcmRlclJpZ2h0OiB0aGlzLnByb3BzLnNpemUgKyAnIHNvbGlkIHRyYW5zcGFyZW50JyxcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbTogdGhpcy5wcm9wcy5zaXplICsgJyBzb2xpZCAnKyB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogdGhpcy5wcm9wcy52ZXJ0aWNhbEFsaWduXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICczcycsICcwcycsICdpbmZpbml0ZScsICdjdWJpYy1iZXppZXIoLjA5LC41NywuNDksLjkpJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRTdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRTaGFycFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb2FkaW5nXG4gICAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnQgfHwgbnVsbH1cbiAgICAgKi9cbiAgICByZW5kZXJMb2FkZXI6IGZ1bmN0aW9uKGxvYWRpbmcpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMb2FkZXIodGhpcy5wcm9wcy5sb2FkaW5nKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ2RvbWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnZG9ta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxuLyoqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcyNSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDApJ1xuICAgIH0sXG4gICAgJzUwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMTgwZGVnKSdcbiAgICB9LFxuICAgICc3NSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoMCkgcm90YXRlWSgxODBkZWcpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoMCkgcm90YXRlWSgwKSdcbiAgICB9XG59O1xuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnNTBweCdcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldFNxdWFyZVN0eWxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IHRoaXMucHJvcHMudmVydGljYWxBbGlnblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnM3MnLCAnMHMnLCAnaW5maW5pdGUnLCAnY3ViaWMtYmV6aWVyKC4wOSwuNTcsLjQ5LC45KSddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICB2YXIgcGVyc3BlY3RpdmUgPSAnMTAwcHgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwZXJzcGVjdGl2ZTogcGVyc3BlY3RpdmUsXG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0U3F1YXJlU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGxvYWRpbmdcbiAgICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudCB8fCBudWxsfVxuICAgICAqL1xuICAgIHJlbmRlckxvYWRlcjogZnVuY3Rpb24obG9hZGluZykge1xuICAgICAgICBpZiAobG9hZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTG9hZGVyKHRoaXMucHJvcHMubG9hZGluZyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdkb21raXQvYXBwZW5kVmVuZG9yUHJlZml4Jyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJ2RvbWtpdC9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbi8qKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMzMlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDEwcHgpJ1xuICAgIH0sXG4gICAgJzY2JSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTBweCknXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSdcbiAgICB9XG59O1xuXG4vKipcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogdGhpcy5wcm9wcy52ZXJ0aWNhbEFsaWduXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcwLjZzJywgKGkgKiAwLjA3KSArICdzJywgJ2luZmluaXRlJywgJ2Vhc2UtaW4tb3V0J10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gaVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRTdHlsZTogZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGxvYWRpbmdcbiAgICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudCB8fCBudWxsfVxuICAgICAqL1xuICAgIHJlbmRlckxvYWRlcjogZnVuY3Rpb24obG9hZGluZykge1xuICAgICAgICBpZiAobG9hZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5nZXRTdHlsZSgxKX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3RoaXMuZ2V0U3R5bGUoMil9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLmdldFN0eWxlKDMpfT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxvYWRlcih0aGlzLnByb3BzLmxvYWRpbmcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFB1bHNlTG9hZGVyOiByZXF1aXJlKCcuL1B1bHNlTG9hZGVyJyksXG4gICAgUm90YXRlTG9hZGVyOiByZXF1aXJlKCcuL1JvdGF0ZUxvYWRlcicpLFxuICAgIEJlYXRMb2FkZXI6IHJlcXVpcmUoJy4vQmVhdExvYWRlcicpLFxuICAgIFJpc2VMb2FkZXI6IHJlcXVpcmUoJy4vUmlzZUxvYWRlcicpLFxuICAgIFN5bmNMb2FkZXI6IHJlcXVpcmUoJy4vU3luY0xvYWRlcicpLFxuICAgIEdyaWRMb2FkZXI6IHJlcXVpcmUoJy4vR3JpZExvYWRlcicpLFxuICAgIENsaXBMb2FkZXI6IHJlcXVpcmUoJy4vQ2xpcExvYWRlcicpLFxuICAgIFNxdWFyZUxvYWRlcjogcmVxdWlyZSgnLi9TcXVhcmVMb2FkZXInKSxcbiAgICBEb3RMb2FkZXI6IHJlcXVpcmUoJy4vRG90TG9hZGVyJyksXG4gICAgUGFjbWFuTG9hZGVyOiByZXF1aXJlKCcuL1BhY21hbkxvYWRlcicpLFxuICAgIE1vb25Mb2FkZXI6IHJlcXVpcmUoJy4vTW9vbkxvYWRlcicpLFxuICAgIFJpbmdMb2FkZXI6IHJlcXVpcmUoJy4vUmluZ0xvYWRlcicpLFxuICAgIEJvdW5jZUxvYWRlcjogcmVxdWlyZSgnLi9Cb3VuY2VMb2FkZXInKSxcbiAgICBTa2V3TG9hZGVyOiByZXF1aXJlKCcuL1NrZXdMb2FkZXInKSxcbiAgICBGYWRlTG9hZGVyOiByZXF1aXJlKCcuL0ZhZGVMb2FkZXInKSxcbiAgICBTY2FsZUxvYWRlcjogcmVxdWlyZSgnLi9TY2FsZUxvYWRlcicpXG59O1xuIl19
