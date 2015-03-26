require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/yuanyan/React/halogen/src/BallClipRotateLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
        var animation = [animationName, '0.75s', '0', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/BallGridPulseLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/BallPulseLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/LineScaleLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/LineSpinFadeLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/PacmanLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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
                    transform: 'translate(0, '+ -this.props.size / 4 + ')',
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/SquareSpinLoader.js":[function(require,module,exports){

var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
        var animation = [animationName, '3s', '0', 'infinite', 'cubic-bezier(.09,.57,.49,.9)'].join(' ');
        var animationFillMode = 'both';
        return {
            animation: animation,
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/assign.js":[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

'use strict';

function assign(target, sources) {
    if (target == null) {
        throw new TypeError('Object.assign target cannot be null or undefined');
    }

    var to = Object(target);
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
        var nextSource = arguments[nextIndex];
        if (nextSource == null) {
            continue;
        }

        var from = Object(nextSource);

        // We don't currently support accessors nor proxies. Therefore this
        // copy cannot throw. If we ever supported this then we must handle
        // exceptions and side-effects. We don't support symbols so they won't
        // be transferred.

        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }
    }

    return to;
}

module.exports = assign;
},{}],"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js":[function(require,module,exports){
var insertRule = require('./insertRule');

var vendorPrefix = '-webkit-';
var index = 0;

function insertKeyframesRule(keyframes) {
    // random name
    var name = 'anim'+ (++index) + (+new Date);
    var css = "@" + vendorPrefix + "keyframes " + name + " {";

    for (var key in keyframes) {
        css += key + " {";

        for (var property in keyframes[key]) {
            css += property + ":" + keyframes[key][property] + ";";
        }

        css += "}";
    }

    css += "}";

    insertRule(css);

    return name
}

module.exports = insertKeyframesRule;
},{"./insertRule":"/Users/yuanyan/React/halogen/src/insertRule.js"}],"/Users/yuanyan/React/halogen/src/insertRule.js":[function(require,module,exports){
'use strict';

var extraSheet;

function insertRule(css) {

    if (!extraSheet) {
        // First time, create an extra stylesheet for adding rules
        extraSheet = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(extraSheet);
        // Keep reference to actual StyleSheet object (`styleSheet` for IE < 9)
        extraSheet = extraSheet.sheet || extraSheet.styleSheet;
    }

    var index = (extraSheet.cssRules || extraSheet.rules).length;
    extraSheet.insertRule(css, index);
}

module.exports = insertRule;
},{}],"halogen":[function(require,module,exports){
module.exports = {
    BallPulseLoader: require('./BallPulseLoader'),
    BallGridPulseLoader: require('./BallGridPulseLoader'),
    BallClipRotateLoader: require('./BallClipRotateLoader'),
    SquareSpinLoader: require('./SquareSpinLoader'),
    PacmanLoader: require('./PacmanLoader'),
    LineSpinFadeLoader: require('./LineSpinFadeLoader'),
    LineScaleLoader: require('./LineScaleLoader')
};

},{"./BallClipRotateLoader":"/Users/yuanyan/React/halogen/src/BallClipRotateLoader.js","./BallGridPulseLoader":"/Users/yuanyan/React/halogen/src/BallGridPulseLoader.js","./BallPulseLoader":"/Users/yuanyan/React/halogen/src/BallPulseLoader.js","./LineScaleLoader":"/Users/yuanyan/React/halogen/src/LineScaleLoader.js","./LineSpinFadeLoader":"/Users/yuanyan/React/halogen/src/LineSpinFadeLoader.js","./PacmanLoader":"/Users/yuanyan/React/halogen/src/PacmanLoader.js","./SquareSpinLoader":"/Users/yuanyan/React/halogen/src/SquareSpinLoader.js"}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQmFsbENsaXBSb3RhdGVMb2FkZXIuanMiLCJzcmMvQmFsbEdyaWRQdWxzZUxvYWRlci5qcyIsInNyYy9CYWxsUHVsc2VMb2FkZXIuanMiLCJzcmMvTGluZVNjYWxlTG9hZGVyLmpzIiwic3JjL0xpbmVTcGluRmFkZUxvYWRlci5qcyIsInNyYy9QYWNtYW5Mb2FkZXIuanMiLCJzcmMvU3F1YXJlU3BpbkxvYWRlci5qcyIsInNyYy9hc3NpZ24uanMiLCJzcmMvaW5zZXJ0S2V5ZnJhbWVzUnVsZS5qcyIsInNyYy9pbnNlcnRSdWxlLmpzIiwic3JjL0hhbG9nZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnLi9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbnZhciBrZXlmcmFtZXMgPSB7XG4gICAgJzAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZykgc2NhbGUoMSknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoMTgwZGVnKSBzY2FsZSgwLjgpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpIHNjYWxlKDEpJ1xuICAgIH1cbn07XG5cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkxvYWRlclwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICczNXB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBib3JkZXI6ICcycHggc29saWQnLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG4gICAgICAgICAgICBib3JkZXJCb3R0b21Db2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50ICFpbXBvcnRhbnQnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcwLjc1cycsICcwJywgJ2luZmluaXRlJywgJ2xpbmVhciddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgpfSlcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJy4vaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjUpJyxcbiAgICAgICAgb3BhY2l0eTogMC43XG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbmZ1bmN0aW9uIHJhbmRvbSh0b3Ape1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogdG9wXG59XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICB2YXIgYW5pbWF0aW9uRHVyYXRpb24gPSAoKHJhbmRvbSgxMDApIC8gMTAwKSArIDAuNikgKyAncyc7XG4gICAgICAgIHZhciBhbmltYXRpb25EZWxheSA9ICgocmFuZG9tKDEwMCkgLyAxMDApIC0gMC4yKSArICdzJztcblxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsIGFuaW1hdGlvbkR1cmF0aW9uLCBhbmltYXRpb25EZWxheSwgJ2luZmluaXRlJywgJ2Vhc2UnXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IChwYXJzZUZsb2F0KHRoaXMucHJvcHMuc2l6ZSkgKiAzKSArIHBhcnNlRmxvYXQodGhpcy5wcm9wcy5tYXJnaW4pICogNixcbiAgICAgICAgICAgIGZvbnRTaXplOiAwXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlfSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg0KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDUpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNil9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg3KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDgpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoOSl9KVxuICAgICAgICApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJy4vaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfSxcbiAgICAnNDUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjEpJyxcbiAgICAgICAgb3BhY2l0eTogMC43XG4gICAgfSxcbiAgICAnODAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxKScsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9XG59O1xuXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICcxNXB4JyxcbiAgICAgICAgICAgIG1hcmdpbjogJzJweCdcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEJhbGxTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcwLjc1cycsIChpICogMC4xMikgKyAncycsICdpbmZpbml0ZScsICdjdWJpYy1iZXppZXIoLjIsLjY4LC4xOCwxLjA4KSddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZSxcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDEpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMil9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgzKX0pXG4gICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnLi9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbnZhciBrZXlmcmFtZXMgPSB7XG4gICAgJzAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZXkoMS4wKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxleSgwLjQpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxleSgxLjApJ1xuICAgIH1cbn07XG5cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkxvYWRlclwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICByYWRpdXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBoZWlnaHQ6ICczNXB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnNHB4JyxcbiAgICAgICAgICAgIG1hcmdpbjogJzJweCcsXG4gICAgICAgICAgICByYWRpdXM6ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRMaW5lU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoaXMucHJvcHMucmFkaXVzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzFzJywgKGkgKiAwLjEpICsgJ3MnLCAnaW5maW5pdGUnLCAnY3ViaWMtYmV6aWVyKC4yLC42OCwuMTgsMS4wOCknXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0TGluZVN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg0KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDUpfSlcbiAgICAgICAgKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCcuL2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnNTAlJzoge1xuICAgICAgICBvcGFjaXR5OiAwLjNcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHJhZGl1czogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGhlaWdodDogJzE1cHgnLFxuICAgICAgICAgICAgd2lkdGg6ICc1cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMnB4JyxcbiAgICAgICAgICAgIHJhZGl1czogJzJweCdcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldExpbmVTdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoaXMucHJvcHMucmFkaXVzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzEuMnMnLCAoaSAqIDAuMTIpICsgJ3MnLCAnaW5maW5pdGUnLCAnZWFzZS1pbi1vdXQnXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0UG9zU3R5bGU6IGZ1bmN0aW9uKGkpe1xuICAgICAgICB2YXIgcmFkaXVzID0gJzIwJztcbiAgICAgICAgdmFyIHF1YXJ0ZXIgPSAocmFkaXVzIC8gMikgKyAocmFkaXVzIC8gNS41KTtcbiAgICAgICAgdmFyIGxpbmVzID0ge1xuICAgICAgICAgICAgbDE6IHtcbiAgICAgICAgICAgICAgICB0b3A6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDI6IHtcbiAgICAgICAgICAgICAgICB0b3A6IHF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgbGVmdDogcXVhcnRlcixcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoLTQ1ZGVnKSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsMzoge1xuICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICBsZWZ0OiByYWRpdXMsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsNDoge1xuICAgICAgICAgICAgICAgIHRvcDogLXF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgbGVmdDogcXVhcnRlcixcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoNDVkZWcpJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGw1OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAtcmFkaXVzLFxuICAgICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsNjoge1xuICAgICAgICAgICAgICAgIHRvcDogLXF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgbGVmdDogLXF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKC00NWRlZyknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDc6IHtcbiAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgbGVmdDogLXJhZGl1cyxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoOTBkZWcpJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGw4OiB7XG4gICAgICAgICAgICAgICAgdG9wOiBxdWFydGVyLFxuICAgICAgICAgICAgICAgIGxlZnQ6IC1xdWFydGVyLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg0NWRlZyknXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGxpbmVzWydsJytpXTtcbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldExpbmVTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0UG9zU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDBcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZX0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMSl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgyKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDMpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNCl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg1KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDYpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg4KX0pXG4gICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnLi9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbnZhciBhbmltYXRpb25zID0ge307XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXJcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6IDI1LFxuICAgICAgICAgICAgbWFyZ2luOiAyXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMucHJvcHMuc2l6ZTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbk5hbWUgPSBhbmltYXRpb25zW3NpemVdO1xuICAgICAgICBpZighYW5pbWF0aW9uTmFtZSl7XG4gICAgICAgICAgICB2YXIga2V5ZnJhbWVzID0ge1xuICAgICAgICAgICAgICAgICc3NSUnOiB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuN1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMCUnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgKC00ICogc2l6ZSkgKyAncHgsJyArICgtc2l6ZSAvIDQpICsgJ3B4KSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYW5pbWF0aW9uTmFtZSA9IGFuaW1hdGlvbnNbc2l6ZV0gPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcxcycsIGkqMC4yNSArICdzJywgJ2luZmluaXRlJywgJ2xpbmVhciddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZSxcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICBpZihpID09IDEpe1xuICAgICAgICAgICAgdmFyIHMxID0gIHRoaXMucHJvcHMuc2l6ZSArICdweCBzb2xpZCB0cmFuc3BhcmVudCc7XG4gICAgICAgICAgICB2YXIgczIgPSAgdGhpcy5wcm9wcy5zaXplICsgJ3B4IHNvbGlkICcgKyB0aGlzLnByb3BzLmNvbG9yO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgICAgICBib3JkZXJSaWdodDogczEsXG4gICAgICAgICAgICAgICAgYm9yZGVyVG9wOiBzMixcbiAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiBzMixcbiAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206IHMyLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhpcy5wcm9wcy5zaXplXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDAsICcrIC10aGlzLnByb3BzLnNpemUgLyA0ICsgJyknLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAyNSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMTAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cblxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICBmb250U2l6ZTogMFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZX0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMSl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgyKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDMpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNCl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg1KX0pXG4gICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCcuL2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMjUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMCknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMTgwZGVnKSdcbiAgICB9LFxuICAgICc3NSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApIHJvdGF0ZVkoMTgwZGVnKSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgwKSByb3RhdGVZKDApJ1xuICAgIH1cbn07XG5cblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnNTBweCdcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFNxdWFyZVN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnNpemVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzNzJywgJzAnLCAnaW5maW5pdGUnLCAnY3ViaWMtYmV6aWVyKC4wOSwuNTcsLjQ5LC45KSddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZSxcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRTcXVhcmVTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgpfSkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgICAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAgICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgICAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247IiwidmFyIGluc2VydFJ1bGUgPSByZXF1aXJlKCcuL2luc2VydFJ1bGUnKTtcblxudmFyIHZlbmRvclByZWZpeCA9ICctd2Via2l0LSc7XG52YXIgaW5kZXggPSAwO1xuXG5mdW5jdGlvbiBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcykge1xuICAgIC8vIHJhbmRvbSBuYW1lXG4gICAgdmFyIG5hbWUgPSAnYW5pbScrICgrK2luZGV4KSArICgrbmV3IERhdGUpO1xuICAgIHZhciBjc3MgPSBcIkBcIiArIHZlbmRvclByZWZpeCArIFwia2V5ZnJhbWVzIFwiICsgbmFtZSArIFwiIHtcIjtcblxuICAgIGZvciAodmFyIGtleSBpbiBrZXlmcmFtZXMpIHtcbiAgICAgICAgY3NzICs9IGtleSArIFwiIHtcIjtcblxuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBrZXlmcmFtZXNba2V5XSkge1xuICAgICAgICAgICAgY3NzICs9IHByb3BlcnR5ICsgXCI6XCIgKyBrZXlmcmFtZXNba2V5XVtwcm9wZXJ0eV0gKyBcIjtcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNzcyArPSBcIn1cIjtcbiAgICB9XG5cbiAgICBjc3MgKz0gXCJ9XCI7XG5cbiAgICBpbnNlcnRSdWxlKGNzcyk7XG5cbiAgICByZXR1cm4gbmFtZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEtleWZyYW1lc1J1bGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0cmFTaGVldDtcblxuZnVuY3Rpb24gaW5zZXJ0UnVsZShjc3MpIHtcblxuICAgIGlmICghZXh0cmFTaGVldCkge1xuICAgICAgICAvLyBGaXJzdCB0aW1lLCBjcmVhdGUgYW4gZXh0cmEgc3R5bGVzaGVldCBmb3IgYWRkaW5nIHJ1bGVzXG4gICAgICAgIGV4dHJhU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGV4dHJhU2hlZXQpO1xuICAgICAgICAvLyBLZWVwIHJlZmVyZW5jZSB0byBhY3R1YWwgU3R5bGVTaGVldCBvYmplY3QgKGBzdHlsZVNoZWV0YCBmb3IgSUUgPCA5KVxuICAgICAgICBleHRyYVNoZWV0ID0gZXh0cmFTaGVldC5zaGVldCB8fCBleHRyYVNoZWV0LnN0eWxlU2hlZXQ7XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gKGV4dHJhU2hlZXQuY3NzUnVsZXMgfHwgZXh0cmFTaGVldC5ydWxlcykubGVuZ3RoO1xuICAgIGV4dHJhU2hlZXQuaW5zZXJ0UnVsZShjc3MsIGluZGV4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRSdWxlOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEJhbGxQdWxzZUxvYWRlcjogcmVxdWlyZSgnLi9CYWxsUHVsc2VMb2FkZXInKSxcbiAgICBCYWxsR3JpZFB1bHNlTG9hZGVyOiByZXF1aXJlKCcuL0JhbGxHcmlkUHVsc2VMb2FkZXInKSxcbiAgICBCYWxsQ2xpcFJvdGF0ZUxvYWRlcjogcmVxdWlyZSgnLi9CYWxsQ2xpcFJvdGF0ZUxvYWRlcicpLFxuICAgIFNxdWFyZVNwaW5Mb2FkZXI6IHJlcXVpcmUoJy4vU3F1YXJlU3BpbkxvYWRlcicpLFxuICAgIFBhY21hbkxvYWRlcjogcmVxdWlyZSgnLi9QYWNtYW5Mb2FkZXInKSxcbiAgICBMaW5lU3BpbkZhZGVMb2FkZXI6IHJlcXVpcmUoJy4vTGluZVNwaW5GYWRlTG9hZGVyJyksXG4gICAgTGluZVNjYWxlTG9hZGVyOiByZXF1aXJlKCcuL0xpbmVTY2FsZUxvYWRlcicpXG59O1xuIl19
