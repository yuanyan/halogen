require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js":[function(require,module,exports){
'use strict';
var getVendorPropertyName = require('./getVendorPropertyName');

module.exports = function (target, sources){
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

},{"./getVendorPropertyName":"/Users/yuanyan/React/halogen/node_modules/react-kit/getVendorPropertyName.js"}],"/Users/yuanyan/React/halogen/node_modules/react-kit/getVendorPrefix.js":[function(require,module,exports){
'use strict';

var cssVendorPrefix;

module.exports = function (){

    if(cssVendorPrefix) return cssVendorPrefix;

    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];

    return cssVendorPrefix = '-' + pre + '-';
}

},{}],"/Users/yuanyan/React/halogen/node_modules/react-kit/getVendorPropertyName.js":[function(require,module,exports){
'use strict';

var div = document.createElement('div');
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
var domVendorPrefix;

// Helper function to get the proper vendor property name. (transition => WebkitTransition)
module.exports = function (prop) {

   if (prop in div.style) return prop;

   var prop = prop.charAt(0).toUpperCase() + prop.substr(1);
   if(domVendorPrefix){
       return domVendorPrefix + prop;
   }else{
       for (var i=0; i<prefixes.length; ++i) {
           var vendorProp = prefixes[i] + prop;
           if (vendorProp in div.style) {
               domVendorPrefix = prefixes[i];
               return vendorProp;
           }
       }
   }
}

},{}],"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js":[function(require,module,exports){
'use strict';

var insertRule = require('./insertRule');
var vendorPrefix = require('./getVendorPrefix')();
var index = 0;

module.exports = function (keyframes) {
    // random name
    var name = 'anim_'+ (++index) + (+new Date);
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

},{"./getVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/getVendorPrefix.js","./insertRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertRule.js"}],"/Users/yuanyan/React/halogen/node_modules/react-kit/insertRule.js":[function(require,module,exports){
'use strict';

var extraSheet;

module.exports = function (css) {

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
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

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

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },
    getBallStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {
        var animation = [animationName, '0.7s', i%2? '0s': '0.35s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    },
    render: function () {

        return (React.createElement("div", null, 
            React.createElement("div", {style: this.getStyle(1)}), 
            React.createElement("div", {style: this.getStyle(2)}), 
            React.createElement("div", {style: this.getStyle(3)})
        ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/BounceLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var keyframes = {
    '0%, 100%': {
        transform: 'scale(0)'
    },
    '50%': {
        transform: 'scale(1.0)'
    }
};

var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '60px'
        };
    },
    getBallStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            borderRadius: '100%',
            opacity: 0.6,
            position: 'absolute',
            top: 0,
            left: 0
        }
    },
    getAnimationStyle: function (i) {

        var animation = [animationName, '2s', i==1? '1s': '0s', 'infinite', 'ease-in-out'].join(' ');
        var animationFillMode = 'both';
        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        if(i){
            return assign(
                this.getBallStyle(i),
                this.getAnimationStyle(i)
            )
        }

        return assign(
            {
                width: this.props.size,
                height: this.props.size,
                position: 'relative'
            }
        )
    },
    render: function () {

        return (
            React.createElement("div", {style: this.getStyle()}, 
                React.createElement("div", {style: this.getStyle(1)}), 
                React.createElement("div", {style: this.getStyle(2)})
            ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/ClipLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

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

var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '35px'
        };
    },
    getBallStyle: function () {
        return {
            width: this.props.size,
            height: this.props.size,
            border: '2px solid',
            borderColor: this.props.color,
            borderBottomColor: 'transparent',
            borderRadius: '100%',
            background: 'transparent !important'
        }
    },
    getAnimationStyle: function (i) {
        var animation = [animationName, '0.75s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    },
    render: function () {
        return React.createElement("div", {style: this.getStyle()})
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/DotLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var rotateKeyframes = {
    '100%': {
        transform: 'rotate(360deg)'
    }
};

var bounceKeyframes = {
    '0%, 100%': {
        transform: 'scale(0)'
    },
    '50%': {
        transform: 'scale(1.0)'
    }
};

var rotateAnimationName = insertKeyframesRule(rotateKeyframes);
var bounceAnimationName = insertKeyframesRule(bounceKeyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '60px'
        };
    },
    getBallStyle: function (size) {
        return {
            backgroundColor: this.props.color,
            width: size,
            height: size,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {

        var animation = [i==0? rotateAnimationName: bounceAnimationName, '2s', i==2? '-1s': '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {
        var size = parseInt(this.props.size);
        var ballSize = size/2;
        if(i) {
            return assign(
                this.getBallStyle(ballSize),
                this.getAnimationStyle(i),
                {
                    position: 'absolute',
                    top: i%2? 0: 'auto',
                    bottom: i%2? 'auto': 0
                }
            )
        }else{
            return assign(
                this.getAnimationStyle(i),
                {
                    width: size,
                    height: size,
                    position: 'relative'
                }
            )
        }

    },
    render: function () {

        return (
            React.createElement("div", {style: this.getStyle(0)}, 
                React.createElement("div", {style: this.getStyle(1)}), 
                React.createElement("div", {style: this.getStyle(2)})
            ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/FadeLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var keyframes = {
    '50%': {
        opacity: 0.3
    },
    '100%': {
        opacity: 1
    }
};

var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        height: React.PropTypes.string,
        width: React.PropTypes.string,
        margin: React.PropTypes.string,
        radius: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            height: '15px',
            width: '5px',
            margin: '2px',
            radius: '2px'
        };
    },
    getLineStyle: function (i) {
        return {
            backgroundColor: this.props.color,
            height: this.props.height,
            width: this.props.width,
            margin: this.props.margin,
            borderRadius: this.props.radius
        }
    },
    getAnimationStyle: function (i) {

        var animation = [animationName, '1.2s', (i * 0.12) + 's', 'infinite', 'ease-in-out'].join(' ');
        var animationFillMode = 'both';
        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getPosStyle: function(i){
        var radius = '20';
        var quarter = (radius / 2) + (radius / 5.5);
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

        return lines['l'+i];
    },
    getStyle: function (i) {

        return assign(
            this.getLineStyle(i),
            this.getPosStyle(i),
            this.getAnimationStyle(i),
            {
                position: 'absolute'
            }
        )
    },
    render: function () {

        var style = {
            position: 'relative',
            fontSize: 0
        };

        return (React.createElement("div", {style: style}, 
            React.createElement("div", {style: this.getStyle(1)}), 
            React.createElement("div", {style: this.getStyle(2)}), 
            React.createElement("div", {style: this.getStyle(3)}), 
            React.createElement("div", {style: this.getStyle(4)}), 
            React.createElement("div", {style: this.getStyle(5)}), 
            React.createElement("div", {style: this.getStyle(6)}), 
            React.createElement("div", {style: this.getStyle(7)}), 
            React.createElement("div", {style: this.getStyle(8)})
        ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/GridLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

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

var animationName = insertKeyframesRule(keyframes);

function random(top){
    return Math.random() * top
}

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },
    getBallStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {

        var animationDuration = ((random(100) / 100) + 0.6) + 's';
        var animationDelay = ((random(100) / 100) - 0.2) + 's';

        var animation = [animationName, animationDuration, animationDelay, 'infinite', 'ease'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    },
    render: function () {
        var style = {
            width: (parseFloat(this.props.size) * 3) + parseFloat(this.props.margin) * 6,
            fontSize: 0
        };
        return (React.createElement("div", {style: style}, 
            React.createElement("div", {style: this.getStyle(1)}), 
            React.createElement("div", {style: this.getStyle(2)}), 
            React.createElement("div", {style: this.getStyle(3)}), 
            React.createElement("div", {style: this.getStyle(4)}), 
            React.createElement("div", {style: this.getStyle(5)}), 
            React.createElement("div", {style: this.getStyle(6)}), 
            React.createElement("div", {style: this.getStyle(7)}), 
            React.createElement("div", {style: this.getStyle(8)}), 
            React.createElement("div", {style: this.getStyle(9)})
        ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/MoonLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var keyframes = {
    '100%': {
        transform: 'rotate(360deg)'
    }
};


var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '60px'
        };
    },
    getBallStyle: function (size) {
        return {
            width: size,
            height: size,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {

        var animation = [animationName, '0.6s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {
        var size = parseInt(this.props.size);
        var moonSize = size/7;
        if(i == 1) {
            return assign(
                this.getBallStyle(moonSize),
                this.getAnimationStyle(i),
                {
                    backgroundColor: this.props.color,
                    opacity: '0.8',
                    position: 'absolute',
                    top: size/2 - moonSize/2
                }
            )
        }else if(i == 2){
            return assign(
                this.getBallStyle(size),
                {
                    border: moonSize +'px solid ' + this.props.color,
                    opacity: 0.1
                }
            );
        }else{
            return assign(
                this.getAnimationStyle(i),
                {
                    position: 'relative'
                }
            )
        }

    },
    render: function () {

        return (
            React.createElement("div", {style: this.getStyle(0)}, 
                React.createElement("div", {style: this.getStyle(1)}), 
                React.createElement("div", {style: this.getStyle(2)})
            ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/PacmanLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var animations = {};

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.number,
        margin: React.PropTypes.number
    },
    getDefaultProps: function(){

        return {
            color: '#ffffff',
            size: 25,
            margin: 2
        };
    },
    getBallStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {

        var size = this.props.size;
        var animationName = animations[size];
        if(!animationName){
            var keyframes = {
                '75%': {
                    opacity: 0.7
                },
                '100%': {
                    transform: 'translate(' + (-4 * size) + 'px,' + (-size / 4) + 'px)'
                }
            };
            animationName = animations[size] = insertKeyframesRule(keyframes);
        }

        var animation = [animationName, '1s', i*0.25 + 's', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        if(i == 1){
            var s1 =  this.props.size + 'px solid transparent';
            var s2 =  this.props.size + 'px solid ' + this.props.color;

            return {
                width: 0,
                height: 0,
                borderRight: s1,
                borderTop: s2,
                borderLeft: s2,
                borderBottom: s2,
                borderRadius: this.props.size
            }

        }else{

            return assign(
                this.getBallStyle(i),
                this.getAnimationStyle(i),
                {
                    width: 10,
                    height: 10,
                    transform: 'translate(0, '+ -this.props.size / 4 + 'px)',
                    position: 'absolute',
                    top: 25,
                    left: 100
                }
            )
        }


    },
    render: function () {

        var style = {
            position: 'relative',
            fontSize: 0
        };
        return (React.createElement("div", {style: style}, 
            React.createElement("div", {style: this.getStyle(1)}), 
            React.createElement("div", {style: this.getStyle(2)}), 
            React.createElement("div", {style: this.getStyle(3)}), 
            React.createElement("div", {style: this.getStyle(4)}), 
            React.createElement("div", {style: this.getStyle(5)})
        ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/PulseLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

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

var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },
    getBallStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {
        var animation = [animationName, '0.75s', (i * 0.12) + 's', 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    },
    render: function () {

        return (React.createElement("div", null, 
            React.createElement("div", {style: this.getStyle(1)}), 
            React.createElement("div", {style: this.getStyle(2)}), 
            React.createElement("div", {style: this.getStyle(3)})
        ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/RingLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var rightRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'

    },
    '100%': {
        transform: 'rotateX(180deg) rotateY(360deg) rotateZ(360deg)'
    }
};

var leftRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    },
    '100%': {
        transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)'
    }
};


var rightRotateAnimationName = insertKeyframesRule(rightRotateKeyframes);
var leftRotateAnimationName = insertKeyframesRule(leftRotateKeyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '60px'
        };
    },
    getCircleStyle: function (size) {
        return {
            width: size,
            height: size,
            border: size/10 +'px solid ' + this.props.color,
            opacity: 0.4,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {

        var animation = [i==1? rightRotateAnimationName: leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';
        var perspective = '800px';

        return {
            perspective: perspective,
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {
        var size = parseInt(this.props.size);
        if(i) {
            return assign(
                this.getCircleStyle(size),
                this.getAnimationStyle(i),
                {
                    position: 'absolute',
                    top: 0,
                    left: 0
                }
            )
        }else{
            return {
                width: size,
                height: size,
                position: 'relative'
            }

        }

    },
    render: function () {

        return (
            React.createElement("div", {style: this.getStyle(0)}, 
                React.createElement("div", {style: this.getStyle(1)}), 
                React.createElement("div", {style: this.getStyle(2)})
            ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/RiseLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var riseAmount = 30;
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


var animationNameEven = insertKeyframesRule(keyframesEven);
var animationNameOdd = insertKeyframesRule(keyframesOdd);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },
    getBallStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {

        var animation = [i%2==0? animationNameEven: animationNameOdd, '1s', '0s', 'infinite', 'cubic-bezier(.15,.46,.9,.6)'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    },
    render: function () {

        return (React.createElement("div", null, 
            React.createElement("div", {style: this.getStyle(1)}), 
            React.createElement("div", {style: this.getStyle(2)}), 
            React.createElement("div", {style: this.getStyle(3)}), 
            React.createElement("div", {style: this.getStyle(4)}), 
            React.createElement("div", {style: this.getStyle(5)})
        ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/RotateLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

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


var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },
    getBallStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {

        var animation = [animationName, '1s', '0s', 'infinite', 'cubic-bezier(.7,-.13,.22,.86)'].join(' ');
        var animationFillMode = 'both';
        return {
            animation: animation,
            animationFillMode: animationFillMode,
        }
    },
    getStyle: function (i) {

        if(i){
            return assign(
                this.getBallStyle(i),
                {
                    opacity: '0.8',
                    position: 'absolute',
                    top: 0,
                    left: i%2? -28: 25
                }
            )
        }

        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block',
                position: 'relative'
            }
        )
    },
    render: function () {

        return (
            React.createElement("div", {style: this.getStyle()}, 
                React.createElement("div", {style: this.getStyle(1)}), 
                React.createElement("div", {style: this.getStyle(2)})
            ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/ScaleLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

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

var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        height: React.PropTypes.string,
        width: React.PropTypes.string,
        margin: React.PropTypes.string,
        radius: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            height: '35px',
            width: '4px',
            margin: '2px',
            radius: '2px'
        };
    },
    getLineStyle: function () {
        return {
            backgroundColor: this.props.color,
            height: this.props.height,
            width: this.props.width,
            margin: this.props.margin,
            borderRadius: this.props.radius
        }
    },
    getAnimationStyle: function (i) {

        var animation = [animationName, '1s', (i * 0.1) + 's', 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ');
        var animationFillMode = 'both';
        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        return assign(
            this.getLineStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    },
    render: function () {

        return (React.createElement("div", null, 
            React.createElement("div", {style: this.getStyle(1)}), 
            React.createElement("div", {style: this.getStyle(2)}), 
            React.createElement("div", {style: this.getStyle(3)}), 
            React.createElement("div", {style: this.getStyle(4)}), 
            React.createElement("div", {style: this.getStyle(5)})
        ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/SkewLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

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

var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '20px'
        };
    },
    getSharpStyle: function () {
        return {
            width: 0,
            height: 0,
            borderLeft: this.props.size + ' solid transparent',
            borderRight: this.props.size + ' solid transparent',
            borderBottom: this.props.size + ' solid '+ this.props.color
        }
    },
    getAnimationStyle: function (i) {
        var animation = [animationName, '3s', '0s', 'infinite', 'cubic-bezier(.09,.57,.49,.9)'].join(' ');
        var animationFillMode = 'both';
        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        return assign(
            this.getSharpStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    },
    render: function () {

        return (
            React.createElement("div", {style: this.getStyle()})
        );
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/SquareLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

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


var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '50px'
        };
    },
    getSquareStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size
        }
    },
    getAnimationStyle: function (i) {
        var animation = [animationName, '3s', '0s', 'infinite', 'cubic-bezier(.09,.57,.49,.9)'].join(' ');
        var animationFillMode = 'both';
        var perspective = '100px';

        return {
            perspective: perspective,
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        return assign(
            this.getSquareStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    },
    render: function () {

        return (React.createElement("div", {style: this.getStyle()}));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"/Users/yuanyan/React/halogen/src/SyncLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

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


var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({displayName: "Loader",
    propTypes: {
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },
    getBallStyle: function () {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%'
        }
    },
    getAnimationStyle: function (i) {
        var animation = [animationName, '0.6s', (i * 0.07) + 's', 'infinite', 'ease-in-out'].join(' ');
        var animationFillMode = 'both';
        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },
    getStyle: function (i) {

        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    },
    render: function () {

        return (React.createElement("div", null, 
            React.createElement("div", {style: this.getStyle(1)}), 
            React.createElement("div", {style: this.getStyle(2)}), 
            React.createElement("div", {style: this.getStyle(3)})
        ));
    }
});

module.exports = Loader;

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/halogen/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/halogen/node_modules/react-kit/insertKeyframesRule.js"}],"halogen":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1raXQvZ2V0VmVuZG9yUHJlZml4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWtpdC9nZXRWZW5kb3JQcm9wZXJ0eU5hbWUuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qta2l0L2luc2VydEtleWZyYW1lc1J1bGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qta2l0L2luc2VydFJ1bGUuanMiLCJzcmMvQmVhdExvYWRlci5qcyIsInNyYy9Cb3VuY2VMb2FkZXIuanMiLCJzcmMvQ2xpcExvYWRlci5qcyIsInNyYy9Eb3RMb2FkZXIuanMiLCJzcmMvRmFkZUxvYWRlci5qcyIsInNyYy9HcmlkTG9hZGVyLmpzIiwic3JjL01vb25Mb2FkZXIuanMiLCJzcmMvUGFjbWFuTG9hZGVyLmpzIiwic3JjL1B1bHNlTG9hZGVyLmpzIiwic3JjL1JpbmdMb2FkZXIuanMiLCJzcmMvUmlzZUxvYWRlci5qcyIsInNyYy9Sb3RhdGVMb2FkZXIuanMiLCJzcmMvU2NhbGVMb2FkZXIuanMiLCJzcmMvU2tld0xvYWRlci5qcyIsInNyYy9TcXVhcmVMb2FkZXIuanMiLCJzcmMvU3luY0xvYWRlci5qcyIsInNyYy9IYWxvZ2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0VmVuZG9yUHJvcGVydHlOYW1lID0gcmVxdWlyZSgnLi9nZXRWZW5kb3JQcm9wZXJ0eU5hbWUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2VzKXtcbiAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gICAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbbmV4dEluZGV4XTtcbiAgICAgICAgaWYgKG5leHRTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnJvbSA9IE9iamVjdChuZXh0U291cmNlKTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJlZml4ZWQgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdG8pIHtcbiAgICAgICAgcHJlZml4ZWRbZ2V0VmVuZG9yUHJvcGVydHlOYW1lKGtleSldID0gdG9ba2V5XVxuICAgIH1cblxuICAgIHJldHVybiBwcmVmaXhlZFxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3NzVmVuZG9yUHJlZml4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpe1xuXG4gICAgaWYoY3NzVmVuZG9yUHJlZml4KSByZXR1cm4gY3NzVmVuZG9yUHJlZml4O1xuXG4gICAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJycpO1xuICAgIHZhciBwcmUgPSAoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc3R5bGVzKS5qb2luKCcnKS5tYXRjaCgvLShtb3p8d2Via2l0fG1zKS0vKSB8fCAoc3R5bGVzLk9MaW5rID09PSAnJyAmJiBbJycsICdvJ10pXG4gICAgKVsxXTtcblxuICAgIHJldHVybiBjc3NWZW5kb3JQcmVmaXggPSAnLScgKyBwcmUgKyAnLSc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbnZhciBwcmVmaXhlcyA9IFsnTW96JywgJ1dlYmtpdCcsICdPJywgJ21zJ107XG52YXIgZG9tVmVuZG9yUHJlZml4O1xuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSBwcm9wZXIgdmVuZG9yIHByb3BlcnR5IG5hbWUuICh0cmFuc2l0aW9uID0+IFdlYmtpdFRyYW5zaXRpb24pXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwcm9wKSB7XG5cbiAgIGlmIChwcm9wIGluIGRpdi5zdHlsZSkgcmV0dXJuIHByb3A7XG5cbiAgIHZhciBwcm9wID0gcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc3Vic3RyKDEpO1xuICAgaWYoZG9tVmVuZG9yUHJlZml4KXtcbiAgICAgICByZXR1cm4gZG9tVmVuZG9yUHJlZml4ICsgcHJvcDtcbiAgIH1lbHNle1xuICAgICAgIGZvciAodmFyIGk9MDsgaTxwcmVmaXhlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICB2YXIgdmVuZG9yUHJvcCA9IHByZWZpeGVzW2ldICsgcHJvcDtcbiAgICAgICAgICAgaWYgKHZlbmRvclByb3AgaW4gZGl2LnN0eWxlKSB7XG4gICAgICAgICAgICAgICBkb21WZW5kb3JQcmVmaXggPSBwcmVmaXhlc1tpXTtcbiAgICAgICAgICAgICAgIHJldHVybiB2ZW5kb3JQcm9wO1xuICAgICAgICAgICB9XG4gICAgICAgfVxuICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5zZXJ0UnVsZSA9IHJlcXVpcmUoJy4vaW5zZXJ0UnVsZScpO1xudmFyIHZlbmRvclByZWZpeCA9IHJlcXVpcmUoJy4vZ2V0VmVuZG9yUHJlZml4JykoKTtcbnZhciBpbmRleCA9IDA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleWZyYW1lcykge1xuICAgIC8vIHJhbmRvbSBuYW1lXG4gICAgdmFyIG5hbWUgPSAnYW5pbV8nKyAoKytpbmRleCkgKyAoK25ldyBEYXRlKTtcbiAgICB2YXIgY3NzID0gXCJAXCIgKyB2ZW5kb3JQcmVmaXggKyBcImtleWZyYW1lcyBcIiArIG5hbWUgKyBcIiB7XCI7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4ga2V5ZnJhbWVzKSB7XG4gICAgICAgIGNzcyArPSBrZXkgKyBcIiB7XCI7XG5cbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4ga2V5ZnJhbWVzW2tleV0pIHtcbiAgICAgICAgICAgIHZhciBwYXJ0ID0gXCI6XCIgKyBrZXlmcmFtZXNba2V5XVtwcm9wZXJ0eV0gKyBcIjtcIjtcbiAgICAgICAgICAgIC8vIFdlIGRvIHZlbmRvciBwcmVmaXggZm9yIGV2ZXJ5IHByb3BlcnR5XG4gICAgICAgICAgICBjc3MgKz0gdmVuZG9yUHJlZml4ICsgcHJvcGVydHkgKyBwYXJ0O1xuICAgICAgICAgICAgY3NzICs9IHByb3BlcnR5ICsgcGFydDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNzcyArPSBcIn1cIjtcbiAgICB9XG5cbiAgICBjc3MgKz0gXCJ9XCI7XG5cbiAgICBpbnNlcnRSdWxlKGNzcyk7XG5cbiAgICByZXR1cm4gbmFtZVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0cmFTaGVldDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG5cbiAgICBpZiAoIWV4dHJhU2hlZXQpIHtcbiAgICAgICAgLy8gRmlyc3QgdGltZSwgY3JlYXRlIGFuIGV4dHJhIHN0eWxlc2hlZXQgZm9yIGFkZGluZyBydWxlc1xuICAgICAgICBleHRyYVNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChleHRyYVNoZWV0KTtcbiAgICAgICAgLy8gS2VlcCByZWZlcmVuY2UgdG8gYWN0dWFsIFN0eWxlU2hlZXQgb2JqZWN0IChgc3R5bGVTaGVldGAgZm9yIElFIDwgOSlcbiAgICAgICAgZXh0cmFTaGVldCA9IGV4dHJhU2hlZXQuc2hlZXQgfHwgZXh0cmFTaGVldC5zdHlsZVNoZWV0O1xuICAgIH1cblxuICAgIHZhciBpbmRleCA9IChleHRyYVNoZWV0LmNzc1J1bGVzIHx8IGV4dHJhU2hlZXQucnVsZXMpLmxlbmd0aDtcbiAgICBleHRyYVNoZWV0Lmluc2VydFJ1bGUoY3NzLCBpbmRleCk7XG5cbiAgICByZXR1cm4gZXh0cmFTaGVldDtcbn1cbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdyZWFjdC1raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDAuNzUpJyxcbiAgICAgICAgb3BhY2l0eTogMC4yXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnMC43cycsIGklMj8gJzBzJzogJzAuMzVzJywgJ2luZmluaXRlJywgJ2xpbmVhciddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDEpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMil9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgzKX0pXG4gICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdyZWFjdC1raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSwgMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMCknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLjApJ1xuICAgIH1cbn07XG5cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkxvYWRlclwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICc2MHB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNixcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgbGVmdDogMFxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcycycsIGk9PTE/ICcxcyc6ICcwcycsICdpbmZpbml0ZScsICdlYXNlLWluLW91dCddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgaWYoaSl7XG4gICAgICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoKX0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDEpfSksIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSlcbiAgICAgICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdyZWFjdC1raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpIHNjYWxlKDEpJ1xuICAgIH0sXG4gICAgJzUwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZykgc2NhbGUoMC44KSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoMzYwZGVnKSBzY2FsZSgxKSdcbiAgICB9XG59O1xuXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMzVweCdcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEJhbGxTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgYm9yZGVyOiAnMnB4IHNvbGlkJyxcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCAhaW1wb3J0YW50J1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnMC43NXMnLCAnMHMnLCAnaW5maW5pdGUnLCAnbGluZWFyJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgpfSlcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0LWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgncmVhY3Qta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIHJvdGF0ZUtleWZyYW1lcyA9IHtcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDM2MGRlZyknXG4gICAgfVxufTtcblxudmFyIGJvdW5jZUtleWZyYW1lcyA9IHtcbiAgICAnMCUsIDEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDApJ1xuICAgIH0sXG4gICAgJzUwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMS4wKSdcbiAgICB9XG59O1xuXG52YXIgcm90YXRlQW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUocm90YXRlS2V5ZnJhbWVzKTtcbnZhciBib3VuY2VBbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShib3VuY2VLZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkxvYWRlclwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogJzYwcHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG4gICAgICAgICAgICB3aWR0aDogc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbaT09MD8gcm90YXRlQW5pbWF0aW9uTmFtZTogYm91bmNlQW5pbWF0aW9uTmFtZSwgJzJzJywgaT09Mj8gJy0xcyc6ICcwcycsICdpbmZpbml0ZScsICdsaW5lYXInXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdmb3J3YXJkcyc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgc2l6ZSA9IHBhcnNlSW50KHRoaXMucHJvcHMuc2l6ZSk7XG4gICAgICAgIHZhciBiYWxsU2l6ZSA9IHNpemUvMjtcbiAgICAgICAgaWYoaSkge1xuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShiYWxsU2l6ZSksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IGklMj8gMDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206IGklMj8gJ2F1dG8nOiAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzaXplLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgwKX0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDEpfSksIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSlcbiAgICAgICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdyZWFjdC1raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICc1MCUnOiB7XG4gICAgICAgIG9wYWNpdHk6IDAuM1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9XG59O1xuXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgcmFkaXVzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTVweCcsXG4gICAgICAgICAgICB3aWR0aDogJzVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnLFxuICAgICAgICAgICAgcmFkaXVzOiAnMnB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0TGluZVN0eWxlOiBmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhpcy5wcm9wcy5yYWRpdXNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnMS4ycycsIChpICogMC4xMikgKyAncycsICdpbmZpbml0ZScsICdlYXNlLWluLW91dCddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0UG9zU3R5bGU6IGZ1bmN0aW9uKGkpe1xuICAgICAgICB2YXIgcmFkaXVzID0gJzIwJztcbiAgICAgICAgdmFyIHF1YXJ0ZXIgPSAocmFkaXVzIC8gMikgKyAocmFkaXVzIC8gNS41KTtcbiAgICAgICAgdmFyIGxpbmVzID0ge1xuICAgICAgICAgICAgbDE6IHtcbiAgICAgICAgICAgICAgICB0b3A6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDI6IHtcbiAgICAgICAgICAgICAgICB0b3A6IHF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgbGVmdDogcXVhcnRlcixcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoLTQ1ZGVnKSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsMzoge1xuICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICBsZWZ0OiByYWRpdXMsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsNDoge1xuICAgICAgICAgICAgICAgIHRvcDogLXF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgbGVmdDogcXVhcnRlcixcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoNDVkZWcpJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGw1OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAtcmFkaXVzLFxuICAgICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsNjoge1xuICAgICAgICAgICAgICAgIHRvcDogLXF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgbGVmdDogLXF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKC00NWRlZyknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDc6IHtcbiAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgbGVmdDogLXJhZGl1cyxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoOTBkZWcpJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGw4OiB7XG4gICAgICAgICAgICAgICAgdG9wOiBxdWFydGVyLFxuICAgICAgICAgICAgICAgIGxlZnQ6IC1xdWFydGVyLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg0NWRlZyknXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGxpbmVzWydsJytpXTtcbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldExpbmVTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0UG9zU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDBcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZX0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMSl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgyKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDMpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNCl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg1KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDYpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg4KX0pXG4gICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdyZWFjdC1raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjUpJyxcbiAgICAgICAgb3BhY2l0eTogMC43XG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbmZ1bmN0aW9uIHJhbmRvbSh0b3Ape1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogdG9wXG59XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICB2YXIgYW5pbWF0aW9uRHVyYXRpb24gPSAoKHJhbmRvbSgxMDApIC8gMTAwKSArIDAuNikgKyAncyc7XG4gICAgICAgIHZhciBhbmltYXRpb25EZWxheSA9ICgocmFuZG9tKDEwMCkgLyAxMDApIC0gMC4yKSArICdzJztcblxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsIGFuaW1hdGlvbkR1cmF0aW9uLCBhbmltYXRpb25EZWxheSwgJ2luZmluaXRlJywgJ2Vhc2UnXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IChwYXJzZUZsb2F0KHRoaXMucHJvcHMuc2l6ZSkgKiAzKSArIHBhcnNlRmxvYXQodGhpcy5wcm9wcy5tYXJnaW4pICogNixcbiAgICAgICAgICAgIGZvbnRTaXplOiAwXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlfSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg0KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDUpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNil9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg3KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDgpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoOSl9KVxuICAgICAgICApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0LWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgncmVhY3Qta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDM2MGRlZyknXG4gICAgfVxufTtcblxuXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICc2MHB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcwLjZzJywgJzBzJywgJ2luZmluaXRlJywgJ2xpbmVhciddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2ZvcndhcmRzJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHZhciBzaXplID0gcGFyc2VJbnQodGhpcy5wcm9wcy5zaXplKTtcbiAgICAgICAgdmFyIG1vb25TaXplID0gc2l6ZS83O1xuICAgICAgICBpZihpID09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUobW9vblNpemUpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjgnLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBzaXplLzIgLSBtb29uU2l6ZS8yXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9ZWxzZSBpZihpID09IDIpe1xuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShzaXplKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogbW9vblNpemUgKydweCBzb2xpZCAnICsgdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4xXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMCl9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgyKX0pXG4gICAgICAgICAgICApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0LWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgncmVhY3Qta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGFuaW1hdGlvbnMgPSB7fTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlclxuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogMjUsXG4gICAgICAgICAgICBtYXJnaW46IDJcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEJhbGxTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBzaXplID0gdGhpcy5wcm9wcy5zaXplO1xuICAgICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IGFuaW1hdGlvbnNbc2l6ZV07XG4gICAgICAgIGlmKCFhbmltYXRpb25OYW1lKXtcbiAgICAgICAgICAgIHZhciBrZXlmcmFtZXMgPSB7XG4gICAgICAgICAgICAgICAgJzc1JSc6IHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC43XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnMTAwJSc6IHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyAoLTQgKiBzaXplKSArICdweCwnICsgKC1zaXplIC8gNCkgKyAncHgpJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbmltYXRpb25OYW1lID0gYW5pbWF0aW9uc1tzaXplXSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzFzJywgaSowLjI1ICsgJ3MnLCAnaW5maW5pdGUnLCAnbGluZWFyJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICB2YXIgczEgPSAgdGhpcy5wcm9wcy5zaXplICsgJ3B4IHNvbGlkIHRyYW5zcGFyZW50JztcbiAgICAgICAgICAgIHZhciBzMiA9ICB0aGlzLnByb3BzLnNpemUgKyAncHggc29saWQgJyArIHRoaXMucHJvcHMuY29sb3I7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlclJpZ2h0OiBzMSxcbiAgICAgICAgICAgICAgICBib3JkZXJUb3A6IHMyLFxuICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IHMyLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogczIsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnByb3BzLnNpemVcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgJysgLXRoaXMucHJvcHMuc2l6ZSAvIDQgKyAncHgpJyxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMjUsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDEwMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG5cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDBcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGV9LCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDEpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMil9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgzKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDQpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNSl9KVxuICAgICAgICApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0LWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgncmVhY3Qta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEpJyxcbiAgICAgICAgb3BhY2l0eTogMVxuICAgIH0sXG4gICAgJzQ1JSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMC4xKScsXG4gICAgICAgIG9wYWNpdHk6IDAuN1xuICAgIH0sXG4gICAgJzgwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnMC43NXMnLCAoaSAqIDAuMTIpICsgJ3MnLCAnaW5maW5pdGUnLCAnY3ViaWMtYmV6aWVyKC4yLC42OCwuMTgsMS4wOCknXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KVxuICAgICAgICApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0LWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgncmVhY3Qta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIHJpZ2h0Um90YXRlS2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlWCgwZGVnKSByb3RhdGVZKDBkZWcpIHJvdGF0ZVooMGRlZyknXG5cbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGVYKDE4MGRlZykgcm90YXRlWSgzNjBkZWcpIHJvdGF0ZVooMzYwZGVnKSdcbiAgICB9XG59O1xuXG52YXIgbGVmdFJvdGF0ZUtleWZyYW1lcyA9IHtcbiAgICAnMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoMGRlZykgcm90YXRlWSgwZGVnKSByb3RhdGVaKDBkZWcpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDE4MGRlZykgcm90YXRlWigzNjBkZWcpJ1xuICAgIH1cbn07XG5cblxudmFyIHJpZ2h0Um90YXRlQW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUocmlnaHRSb3RhdGVLZXlmcmFtZXMpO1xudmFyIGxlZnRSb3RhdGVBbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShsZWZ0Um90YXRlS2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICc2MHB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Q2lyY2xlU3R5bGU6IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgICAgICAgIGJvcmRlcjogc2l6ZS8xMCArJ3B4IHNvbGlkICcgKyB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgb3BhY2l0eTogMC40LFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTAwJSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFtpPT0xPyByaWdodFJvdGF0ZUFuaW1hdGlvbk5hbWU6IGxlZnRSb3RhdGVBbmltYXRpb25OYW1lLCAnMnMnLCAnMHMnLCAnaW5maW5pdGUnLCAnbGluZWFyJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnZm9yd2FyZHMnO1xuICAgICAgICB2YXIgcGVyc3BlY3RpdmUgPSAnODAwcHgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwZXJzcGVjdGl2ZTogcGVyc3BlY3RpdmUsXG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIHNpemUgPSBwYXJzZUludCh0aGlzLnByb3BzLnNpemUpO1xuICAgICAgICBpZihpKSB7XG4gICAgICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2lyY2xlU3R5bGUoc2l6ZSksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogc2l6ZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgwKX0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDEpfSksIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSlcbiAgICAgICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdyZWFjdC1raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIgcmlzZUFtb3VudCA9IDMwO1xudmFyIGtleWZyYW1lc0V2ZW4gPSB7XG4gICAgJzAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxLjEpJ1xuICAgIH0sXG4gICAgJzI1Jzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0nICsgcmlzZUFtb3VudCArICdweCknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjQpJ1xuICAgIH0sXG4gICAgJzc1JSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgnICsgcmlzZUFtb3VudCArICdweCknXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSBzY2FsZSgxLjApJ1xuICAgIH1cbn07XG5cbnZhciBrZXlmcmFtZXNPZGQgPSB7XG4gICAgJzAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjQpJ1xuICAgIH0sXG4gICAgJzI1Jzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyByaXNlQW1vdW50ICsgJ3B4KSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEuMSknXG4gICAgfSxcbiAgICAnNzUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0nICsgcmlzZUFtb3VudCArICdweCknXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSBzY2FsZSgwLjc1KSdcbiAgICB9XG59O1xuXG5cbnZhciBhbmltYXRpb25OYW1lRXZlbiA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzRXZlbik7XG52YXIgYW5pbWF0aW9uTmFtZU9kZCA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzT2RkKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICcxNXB4JyxcbiAgICAgICAgICAgIG1hcmdpbjogJzJweCdcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEJhbGxTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbaSUyPT0wPyBhbmltYXRpb25OYW1lRXZlbjogYW5pbWF0aW9uTmFtZU9kZCwgJzFzJywgJzBzJywgJ2luZmluaXRlJywgJ2N1YmljLWJlemllciguMTUsLjQ2LC45LC42KSddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDEpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMil9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgzKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDQpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNSl9KVxuICAgICAgICApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0LWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgncmVhY3Qta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgxODBkZWcpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpJ1xuICAgIH1cbn07XG5cblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcxcycsICcwcycsICdpbmZpbml0ZScsICdjdWJpYy1iZXppZXIoLjcsLS4xMywuMjIsLjg2KSddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIGlmKGkpe1xuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjgnLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBpJTI/IC0yODogMjVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgpfSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMSl9KSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMil9KVxuICAgICAgICAgICAgKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdyZWFjdC1raXQvYXBwZW5kVmVuZG9yUHJlZml4Jyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJ3JlYWN0LWtpdC9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbnZhciBrZXlmcmFtZXMgPSB7XG4gICAgJzAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZXkoMS4wKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxleSgwLjQpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxleSgxLjApJ1xuICAgIH1cbn07XG5cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkxvYWRlclwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICByYWRpdXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBoZWlnaHQ6ICczNXB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnNHB4JyxcbiAgICAgICAgICAgIG1hcmdpbjogJzJweCcsXG4gICAgICAgICAgICByYWRpdXM6ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRMaW5lU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoaXMucHJvcHMucmFkaXVzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzFzJywgKGkgKiAwLjEpICsgJ3MnLCAnaW5maW5pdGUnLCAnY3ViaWMtYmV6aWVyKC4yLC42OCwuMTgsMS4wOCknXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldExpbmVTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMSl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgyKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDMpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNCl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg1KX0pXG4gICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdyZWFjdC1raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcyNSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgwKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgxODBkZWcpJ1xuICAgIH0sXG4gICAgJzc1JSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMCkgcm90YXRlWSgxODBkZWcpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApIHJvdGF0ZVkoMCknXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogJzIwcHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRTaGFycFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIGJvcmRlckxlZnQ6IHRoaXMucHJvcHMuc2l6ZSArICcgc29saWQgdHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgYm9yZGVyUmlnaHQ6IHRoaXMucHJvcHMuc2l6ZSArICcgc29saWQgdHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tOiB0aGlzLnByb3BzLnNpemUgKyAnIHNvbGlkICcrIHRoaXMucHJvcHMuY29sb3JcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzNzJywgJzBzJywgJ2luZmluaXRlJywgJ2N1YmljLWJlemllciguMDksLjU3LC40OSwuOSknXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldFNoYXJwU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgpfSlcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0LWtpdC9hcHBlbmRWZW5kb3JQcmVmaXgnKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgncmVhY3Qta2l0L2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMjUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGVYKDE4MGRlZykgcm90YXRlWSgwKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDE4MGRlZyknXG4gICAgfSxcbiAgICAnNzUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGVYKDApIHJvdGF0ZVkoMTgwZGVnKSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGVYKDApIHJvdGF0ZVkoMCknXG4gICAgfVxufTtcblxuXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICc1MHB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0U3F1YXJlU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnM3MnLCAnMHMnLCAnaW5maW5pdGUnLCAnY3ViaWMtYmV6aWVyKC4wOSwuNTcsLjQ5LC45KSddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICB2YXIgcGVyc3BlY3RpdmUgPSAnMTAwcHgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwZXJzcGVjdGl2ZTogcGVyc3BlY3RpdmUsXG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRTcXVhcmVTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgpfSkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeCcpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCdyZWFjdC1raXQvaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICczMyUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMTBweCknXG4gICAgfSxcbiAgICAnNjYlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMHB4KSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJ1xuICAgIH1cbn07XG5cblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnMC42cycsIChpICogMC4wNykgKyAncycsICdpbmZpbml0ZScsICdlYXNlLWluLW91dCddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KVxuICAgICAgICApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBQdWxzZUxvYWRlcjogcmVxdWlyZSgnLi9QdWxzZUxvYWRlcicpLFxuICAgIFJvdGF0ZUxvYWRlcjogcmVxdWlyZSgnLi9Sb3RhdGVMb2FkZXInKSxcbiAgICBCZWF0TG9hZGVyOiByZXF1aXJlKCcuL0JlYXRMb2FkZXInKSxcbiAgICBSaXNlTG9hZGVyOiByZXF1aXJlKCcuL1Jpc2VMb2FkZXInKSxcbiAgICBTeW5jTG9hZGVyOiByZXF1aXJlKCcuL1N5bmNMb2FkZXInKSxcbiAgICBHcmlkTG9hZGVyOiByZXF1aXJlKCcuL0dyaWRMb2FkZXInKSxcbiAgICBDbGlwTG9hZGVyOiByZXF1aXJlKCcuL0NsaXBMb2FkZXInKSxcbiAgICBTcXVhcmVMb2FkZXI6IHJlcXVpcmUoJy4vU3F1YXJlTG9hZGVyJyksXG4gICAgRG90TG9hZGVyOiByZXF1aXJlKCcuL0RvdExvYWRlcicpLFxuICAgIFBhY21hbkxvYWRlcjogcmVxdWlyZSgnLi9QYWNtYW5Mb2FkZXInKSxcbiAgICBNb29uTG9hZGVyOiByZXF1aXJlKCcuL01vb25Mb2FkZXInKSxcbiAgICBSaW5nTG9hZGVyOiByZXF1aXJlKCcuL1JpbmdMb2FkZXInKSxcbiAgICBCb3VuY2VMb2FkZXI6IHJlcXVpcmUoJy4vQm91bmNlTG9hZGVyJyksXG4gICAgU2tld0xvYWRlcjogcmVxdWlyZSgnLi9Ta2V3TG9hZGVyJyksXG4gICAgRmFkZUxvYWRlcjogcmVxdWlyZSgnLi9GYWRlTG9hZGVyJyksXG4gICAgU2NhbGVMb2FkZXI6IHJlcXVpcmUoJy4vU2NhbGVMb2FkZXInKVxufTtcbiJdfQ==
