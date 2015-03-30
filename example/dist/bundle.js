require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/yuanyan/React/halogen/src/BallBeatLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/BallClipRotateLoader.js":[function(require,module,exports){
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/BallPulseRiseLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
            React.createElement("div", {style: this.getStyle(3)}), 
            React.createElement("div", {style: this.getStyle(4)}), 
            React.createElement("div", {style: this.getStyle(5)})
        ));
    }
});

module.exports = Loader;

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/BallPulseSyncLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/BallRotateLoader.js":[function(require,module,exports){
var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/LineFadeLoader.js":[function(require,module,exports){
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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/SquareLoader.js":[function(require,module,exports){

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

},{"./assign":"/Users/yuanyan/React/halogen/src/assign.js","./insertKeyframesRule":"/Users/yuanyan/React/halogen/src/insertKeyframesRule.js","react":false}],"/Users/yuanyan/React/halogen/src/TriangleSkewLoader.js":[function(require,module,exports){
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
    '75%': {
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
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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
    BallRotateLoader: require('./BallRotateLoader'),
    BallBeatLoader: require('./BallBeatLoader'),
    BallPulseRiseLoader: require('./BallPulseRiseLoader'),
    BallPulseSyncLoader: require('./BallPulseSyncLoader'),
    BallGridPulseLoader: require('./BallGridPulseLoader'),
    BallClipRotateLoader: require('./BallClipRotateLoader'),
    SquareLoader: require('./SquareLoader'),
    PacmanLoader: require('./PacmanLoader'),
    TriangleSkewLoader: require('./TriangleSkewLoader'),
    LineFadeLoader: require('./LineFadeLoader'),
    LineScaleLoader: require('./LineScaleLoader')
};

},{"./BallBeatLoader":"/Users/yuanyan/React/halogen/src/BallBeatLoader.js","./BallClipRotateLoader":"/Users/yuanyan/React/halogen/src/BallClipRotateLoader.js","./BallGridPulseLoader":"/Users/yuanyan/React/halogen/src/BallGridPulseLoader.js","./BallPulseLoader":"/Users/yuanyan/React/halogen/src/BallPulseLoader.js","./BallPulseRiseLoader":"/Users/yuanyan/React/halogen/src/BallPulseRiseLoader.js","./BallPulseSyncLoader":"/Users/yuanyan/React/halogen/src/BallPulseSyncLoader.js","./BallRotateLoader":"/Users/yuanyan/React/halogen/src/BallRotateLoader.js","./LineFadeLoader":"/Users/yuanyan/React/halogen/src/LineFadeLoader.js","./LineScaleLoader":"/Users/yuanyan/React/halogen/src/LineScaleLoader.js","./PacmanLoader":"/Users/yuanyan/React/halogen/src/PacmanLoader.js","./SquareLoader":"/Users/yuanyan/React/halogen/src/SquareLoader.js","./TriangleSkewLoader":"/Users/yuanyan/React/halogen/src/TriangleSkewLoader.js"}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQmFsbEJlYXRMb2FkZXIuanMiLCJzcmMvQmFsbENsaXBSb3RhdGVMb2FkZXIuanMiLCJzcmMvQmFsbEdyaWRQdWxzZUxvYWRlci5qcyIsInNyYy9CYWxsUHVsc2VMb2FkZXIuanMiLCJzcmMvQmFsbFB1bHNlUmlzZUxvYWRlci5qcyIsInNyYy9CYWxsUHVsc2VTeW5jTG9hZGVyLmpzIiwic3JjL0JhbGxSb3RhdGVMb2FkZXIuanMiLCJzcmMvTGluZUZhZGVMb2FkZXIuanMiLCJzcmMvTGluZVNjYWxlTG9hZGVyLmpzIiwic3JjL1BhY21hbkxvYWRlci5qcyIsInNyYy9TcXVhcmVMb2FkZXIuanMiLCJzcmMvVHJpYW5nbGVTa2V3TG9hZGVyLmpzIiwic3JjL2Fzc2lnbi5qcyIsInNyYy9pbnNlcnRLZXlmcmFtZXNSdWxlLmpzIiwic3JjL2luc2VydFJ1bGUuanMiLCJzcmMvSGFsb2dlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJy4vaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDAuNzUpJyxcbiAgICAgICAgb3BhY2l0eTogMC4yXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnMC43cycsIGklMj8gJzBzJzogJzAuMzVzJywgJ2luZmluaXRlJywgJ2xpbmVhciddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZSxcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDEpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMil9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgzKX0pXG4gICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnLi9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbnZhciBrZXlmcmFtZXMgPSB7XG4gICAgJzAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZykgc2NhbGUoMSknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoMTgwZGVnKSBzY2FsZSgwLjgpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgzNjBkZWcpIHNjYWxlKDEpJ1xuICAgIH1cbn07XG5cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkxvYWRlclwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICczNXB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBib3JkZXI6ICcycHggc29saWQnLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG4gICAgICAgICAgICBib3JkZXJCb3R0b21Db2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50ICFpbXBvcnRhbnQnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcwLjc1cycsICcwJywgJ2luZmluaXRlJywgJ2xpbmVhciddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgpfSlcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJy4vaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjUpJyxcbiAgICAgICAgb3BhY2l0eTogMC43XG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbmZ1bmN0aW9uIHJhbmRvbSh0b3Ape1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogdG9wXG59XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzaXplOiAnMTVweCcsXG4gICAgICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRCYWxsU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMDAlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICB2YXIgYW5pbWF0aW9uRHVyYXRpb24gPSAoKHJhbmRvbSgxMDApIC8gMTAwKSArIDAuNikgKyAncyc7XG4gICAgICAgIHZhciBhbmltYXRpb25EZWxheSA9ICgocmFuZG9tKDEwMCkgLyAxMDApIC0gMC4yKSArICdzJztcblxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsIGFuaW1hdGlvbkR1cmF0aW9uLCBhbmltYXRpb25EZWxheSwgJ2luZmluaXRlJywgJ2Vhc2UnXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IChwYXJzZUZsb2F0KHRoaXMucHJvcHMuc2l6ZSkgKiAzKSArIHBhcnNlRmxvYXQodGhpcy5wcm9wcy5tYXJnaW4pICogNixcbiAgICAgICAgICAgIGZvbnRTaXplOiAwXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlfSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg0KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDUpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNil9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg3KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDgpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoOSl9KVxuICAgICAgICApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJy4vaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfSxcbiAgICAnNDUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjEpJyxcbiAgICAgICAgb3BhY2l0eTogMC43XG4gICAgfSxcbiAgICAnODAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSgxKScsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9XG59O1xuXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICcxNXB4JyxcbiAgICAgICAgICAgIG1hcmdpbjogJzJweCdcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEJhbGxTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2FuaW1hdGlvbk5hbWUsICcwLjc1cycsIChpICogMC4xMikgKyAncycsICdpbmZpbml0ZScsICdjdWJpYy1iZXppZXIoLjIsLjY4LC4xOCwxLjA4KSddLmpvaW4oJyAnKTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbkZpbGxNb2RlID0gJ2JvdGgnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZSxcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbkZpbGxNb2RlOiBhbmltYXRpb25GaWxsTW9kZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDEpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMil9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgzKX0pXG4gICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnLi9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbnZhciByaXNlQW1vdW50ID0gMzA7XG52YXIga2V5ZnJhbWVzRXZlbiA9IHtcbiAgICAnMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEuMSknXG4gICAgfSxcbiAgICAnMjUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLScgKyByaXNlQW1vdW50ICsgJ3B4KSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDAuNCknXG4gICAgfSxcbiAgICAnNzUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyByaXNlQW1vdW50ICsgJ3B4KSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApIHNjYWxlKDEuMCknXG4gICAgfVxufTtcblxudmFyIGtleWZyYW1lc09kZCA9IHtcbiAgICAnMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDAuNCknXG4gICAgfSxcbiAgICAnMjUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArIHJpc2VBbW91bnQgKyAncHgpJ1xuICAgIH0sXG4gICAgJzUwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMS4xKSdcbiAgICB9LFxuICAgICc3NSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLScgKyByaXNlQW1vdW50ICsgJ3B4KSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApIHNjYWxlKDAuNzUpJ1xuICAgIH1cbn07XG5cblxudmFyIGFuaW1hdGlvbk5hbWVFdmVuID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXNFdmVuKTtcbnZhciBhbmltYXRpb25OYW1lT2RkID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXNPZGQpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkxvYWRlclwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogJzE1cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMnB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBtYXJnaW46IHRoaXMucHJvcHMubWFyZ2luLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTAwJSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cblxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gW2klMj09MD8gYW5pbWF0aW9uTmFtZUV2ZW46IGFuaW1hdGlvbk5hbWVPZGQsICcxcycsICcwcycsICdpbmZpbml0ZScsICdjdWJpYy1iZXppZXIoLjE1LC40NiwuOSwuNiknXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg0KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDUpfSlcbiAgICAgICAgKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCcuL2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMzMlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDEwcHgpJ1xuICAgIH0sXG4gICAgJzY2JSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTBweCknXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSdcbiAgICB9XG59O1xuXG5cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkxvYWRlclwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogJzE1cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMnB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0QmFsbFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3IsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBtYXJnaW46IHRoaXMucHJvcHMubWFyZ2luLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTAwJSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzAuNnMnLCAoaSAqIDAuMDcpICsgJ3MnLCAnaW5maW5pdGUnLCAnZWFzZS1pbi1vdXQnXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0QmFsbFN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KVxuICAgICAgICApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJy4vaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJ1xuICAgIH0sXG4gICAgJzUwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDM2MGRlZyknXG4gICAgfVxufTtcblxuXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICcxNXB4JyxcbiAgICAgICAgICAgIG1hcmdpbjogJzJweCdcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEJhbGxTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzFzJywgJzBzJywgJ2luZmluaXRlJywgJ2N1YmljLWJlemllciguNywtLjEzLC4yMiwuODYpJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIGlmKGkpe1xuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwLjgnLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBpJTI/IC0yODogMjVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXNzaWduKFxuICAgICAgICAgICAgdGhpcy5nZXRCYWxsU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgpfSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMSl9KSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMil9KVxuICAgICAgICAgICAgKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCcuL2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnNTAlJzoge1xuICAgICAgICBvcGFjaXR5OiAwLjNcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHJhZGl1czogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIGhlaWdodDogJzE1cHgnLFxuICAgICAgICAgICAgd2lkdGg6ICc1cHgnLFxuICAgICAgICAgICAgbWFyZ2luOiAnMnB4JyxcbiAgICAgICAgICAgIHJhZGl1czogJzJweCdcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldExpbmVTdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoaXMucHJvcHMucmFkaXVzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzEuMnMnLCAoaSAqIDAuMTIpICsgJ3MnLCAnaW5maW5pdGUnLCAnZWFzZS1pbi1vdXQnXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0UG9zU3R5bGU6IGZ1bmN0aW9uKGkpe1xuICAgICAgICB2YXIgcmFkaXVzID0gJzIwJztcbiAgICAgICAgdmFyIHF1YXJ0ZXIgPSAocmFkaXVzIC8gMikgKyAocmFkaXVzIC8gNS41KTtcbiAgICAgICAgdmFyIGxpbmVzID0ge1xuICAgICAgICAgICAgbDE6IHtcbiAgICAgICAgICAgICAgICB0b3A6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDI6IHtcbiAgICAgICAgICAgICAgICB0b3A6IHF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgbGVmdDogcXVhcnRlcixcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoLTQ1ZGVnKSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsMzoge1xuICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICBsZWZ0OiByYWRpdXMsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsNDoge1xuICAgICAgICAgICAgICAgIHRvcDogLXF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgbGVmdDogcXVhcnRlcixcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoNDVkZWcpJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGw1OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAtcmFkaXVzLFxuICAgICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsNjoge1xuICAgICAgICAgICAgICAgIHRvcDogLXF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgbGVmdDogLXF1YXJ0ZXIsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKC00NWRlZyknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDc6IHtcbiAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgbGVmdDogLXJhZGl1cyxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoOTBkZWcpJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGw4OiB7XG4gICAgICAgICAgICAgICAgdG9wOiBxdWFydGVyLFxuICAgICAgICAgICAgICAgIGxlZnQ6IC1xdWFydGVyLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg0NWRlZyknXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGxpbmVzWydsJytpXTtcbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldExpbmVTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0UG9zU3R5bGUoaSksXG4gICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDBcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZX0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMSl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgyKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDMpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNCl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg1KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDYpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoNyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg4KX0pXG4gICAgICAgICkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcbnZhciBpbnNlcnRLZXlmcmFtZXNSdWxlID0gcmVxdWlyZSgnLi9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbnZhciBrZXlmcmFtZXMgPSB7XG4gICAgJzAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZXkoMS4wKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxleSgwLjQpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxleSgxLjApJ1xuICAgIH1cbn07XG5cbnZhciBhbmltYXRpb25OYW1lID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZShrZXlmcmFtZXMpO1xuXG52YXIgTG9hZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkxvYWRlclwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2xvcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgbWFyZ2luOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICByYWRpdXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9LFxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBoZWlnaHQ6ICczNXB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnNHB4JyxcbiAgICAgICAgICAgIG1hcmdpbjogJzJweCcsXG4gICAgICAgICAgICByYWRpdXM6ICcycHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRMaW5lU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcbiAgICAgICAgICAgIG1hcmdpbjogdGhpcy5wcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoaXMucHJvcHMucmFkaXVzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzFzJywgKGkgKiAwLjEpICsgJ3MnLCAnaW5maW5pdGUnLCAnY3ViaWMtYmV6aWVyKC4yLC42OCwuMTgsMS4wOCknXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0TGluZVN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg0KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDUpfSlcbiAgICAgICAgKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCcuL2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGFuaW1hdGlvbnMgPSB7fTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlclxuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogMjUsXG4gICAgICAgICAgICBtYXJnaW46IDJcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEJhbGxTdHlsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgICAgbWFyZ2luOiB0aGlzLnByb3BzLm1hcmdpbixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEwMCUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuaW1hdGlvblN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHZhciBzaXplID0gdGhpcy5wcm9wcy5zaXplO1xuICAgICAgICB2YXIgYW5pbWF0aW9uTmFtZSA9IGFuaW1hdGlvbnNbc2l6ZV07XG4gICAgICAgIGlmKCFhbmltYXRpb25OYW1lKXtcbiAgICAgICAgICAgIHZhciBrZXlmcmFtZXMgPSB7XG4gICAgICAgICAgICAgICAgJzc1JSc6IHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC43XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnMTAwJSc6IHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyAoLTQgKiBzaXplKSArICdweCwnICsgKC1zaXplIC8gNCkgKyAncHgpJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhbmltYXRpb25OYW1lID0gYW5pbWF0aW9uc1tzaXplXSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzFzJywgaSowLjI1ICsgJ3MnLCAnaW5maW5pdGUnLCAnbGluZWFyJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICB2YXIgczEgPSAgdGhpcy5wcm9wcy5zaXplICsgJ3B4IHNvbGlkIHRyYW5zcGFyZW50JztcbiAgICAgICAgICAgIHZhciBzMiA9ICB0aGlzLnByb3BzLnNpemUgKyAncHggc29saWQgJyArIHRoaXMucHJvcHMuY29sb3I7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlclJpZ2h0OiBzMSxcbiAgICAgICAgICAgICAgICBib3JkZXJUb3A6IHMyLFxuICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IHMyLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogczIsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGlzLnByb3BzLnNpemVcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgICAgICB0aGlzLmdldEJhbGxTdHlsZShpKSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldEFuaW1hdGlvblN0eWxlKGkpLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgJysgLXRoaXMucHJvcHMuc2l6ZSAvIDQgKyAnKScsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDI1LFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAxMDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAwXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlfSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSgxKX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDIpfSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMuZ2V0U3R5bGUoMyl9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5nZXRTdHlsZSg0KX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKDUpfSlcbiAgICAgICAgKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwiXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJy4vaW5zZXJ0S2V5ZnJhbWVzUnVsZScpO1xuXG52YXIga2V5ZnJhbWVzID0ge1xuICAgICcyNSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgwKSdcbiAgICB9LFxuICAgICc1MCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgxODBkZWcpJ1xuICAgIH0sXG4gICAgJzc1JSc6IHtcbiAgICAgICAgdHJhbnNmb3JtOiAncGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMCkgcm90YXRlWSgxODBkZWcpJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApIHJvdGF0ZVkoMCknXG4gICAgfVxufTtcblxuXG52YXIgYW5pbWF0aW9uTmFtZSA9IGluc2VydEtleWZyYW1lc1J1bGUoa2V5ZnJhbWVzKTtcblxudmFyIExvYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMb2FkZXJcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29sb3I6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHNpemU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG1hcmdpbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0sXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHNpemU6ICc1MHB4J1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0U3F1YXJlU3R5bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5wcm9wcy5jb2xvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuc2l6ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRBbmltYXRpb25TdHlsZTogZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGFuaW1hdGlvbiA9IFthbmltYXRpb25OYW1lLCAnM3MnLCAnMCcsICdpbmZpbml0ZScsICdjdWJpYy1iZXppZXIoLjA5LC41NywuNDksLjkpJ10uam9pbignICcpO1xuICAgICAgICB2YXIgYW5pbWF0aW9uRmlsbE1vZGUgPSAnYm90aCc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIFdlYmtpdEFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgYW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uRmlsbE1vZGU6IGFuaW1hdGlvbkZpbGxNb2RlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0eWxlOiBmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgIHJldHVybiBhc3NpZ24oXG4gICAgICAgICAgICB0aGlzLmdldFNxdWFyZVN0eWxlKGkpLFxuICAgICAgICAgICAgdGhpcy5nZXRBbmltYXRpb25TdHlsZShpKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKCl9KSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xudmFyIGluc2VydEtleWZyYW1lc1J1bGUgPSByZXF1aXJlKCcuL2luc2VydEtleWZyYW1lc1J1bGUnKTtcblxudmFyIGtleWZyYW1lcyA9IHtcbiAgICAnMjUlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMCknXG4gICAgfSxcbiAgICAnNTAlJzoge1xuICAgICAgICB0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMTgwZGVnKSdcbiAgICB9LFxuICAgICc3NSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApIHJvdGF0ZVkoMTgwZGVnKSdcbiAgICB9LFxuICAgICc3NSUnOiB7XG4gICAgICAgIHRyYW5zZm9ybTogJ3BlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApIHJvdGF0ZVkoMCknXG4gICAgfVxufTtcblxudmFyIGFuaW1hdGlvbk5hbWUgPSBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcyk7XG5cbnZhciBMb2FkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTG9hZGVyXCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBzaXplOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc2l6ZTogJzIwcHgnXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRTaGFycFN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIGJvcmRlckxlZnQ6IHRoaXMucHJvcHMuc2l6ZSArICcgc29saWQgdHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgYm9yZGVyUmlnaHQ6IHRoaXMucHJvcHMuc2l6ZSArICcgc29saWQgdHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tOiB0aGlzLnByb3BzLnNpemUgKyAnIHNvbGlkICcrIHRoaXMucHJvcHMuY29sb3JcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0QW5pbWF0aW9uU3R5bGU6IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSBbYW5pbWF0aW9uTmFtZSwgJzNzJywgJzBzJywgJ2luZmluaXRlJywgJ2N1YmljLWJlemllciguMDksLjU3LC40OSwuOSknXS5qb2luKCcgJyk7XG4gICAgICAgIHZhciBhbmltYXRpb25GaWxsTW9kZSA9ICdib3RoJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgICAgICAgV2Via2l0QW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGUsXG4gICAgICAgICAgICBXZWJraXRBbmltYXRpb25GaWxsTW9kZTogYW5pbWF0aW9uRmlsbE1vZGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3R5bGU6IGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgcmV0dXJuIGFzc2lnbihcbiAgICAgICAgICAgIHRoaXMuZ2V0U2hhcnBTdHlsZShpKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0QW5pbWF0aW9uU3R5bGUoaSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB0aGlzLmdldFN0eWxlKCl9KVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlcjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgICAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAgICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgICAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247IiwidmFyIGluc2VydFJ1bGUgPSByZXF1aXJlKCcuL2luc2VydFJ1bGUnKTtcblxudmFyIHZlbmRvclByZWZpeCA9ICctd2Via2l0LSc7XG52YXIgaW5kZXggPSAwO1xuXG5mdW5jdGlvbiBpbnNlcnRLZXlmcmFtZXNSdWxlKGtleWZyYW1lcykge1xuICAgIC8vIHJhbmRvbSBuYW1lXG4gICAgdmFyIG5hbWUgPSAnYW5pbScrICgrK2luZGV4KSArICgrbmV3IERhdGUpO1xuICAgIHZhciBjc3MgPSBcIkBcIiArIHZlbmRvclByZWZpeCArIFwia2V5ZnJhbWVzIFwiICsgbmFtZSArIFwiIHtcIjtcblxuICAgIGZvciAodmFyIGtleSBpbiBrZXlmcmFtZXMpIHtcbiAgICAgICAgY3NzICs9IGtleSArIFwiIHtcIjtcblxuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBrZXlmcmFtZXNba2V5XSkge1xuICAgICAgICAgICAgY3NzICs9IHByb3BlcnR5ICsgXCI6XCIgKyBrZXlmcmFtZXNba2V5XVtwcm9wZXJ0eV0gKyBcIjtcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNzcyArPSBcIn1cIjtcbiAgICB9XG5cbiAgICBjc3MgKz0gXCJ9XCI7XG5cbiAgICBpbnNlcnRSdWxlKGNzcyk7XG5cbiAgICByZXR1cm4gbmFtZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEtleWZyYW1lc1J1bGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0cmFTaGVldDtcblxuZnVuY3Rpb24gaW5zZXJ0UnVsZShjc3MpIHtcblxuICAgIGlmICghZXh0cmFTaGVldCkge1xuICAgICAgICAvLyBGaXJzdCB0aW1lLCBjcmVhdGUgYW4gZXh0cmEgc3R5bGVzaGVldCBmb3IgYWRkaW5nIHJ1bGVzXG4gICAgICAgIGV4dHJhU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGV4dHJhU2hlZXQpO1xuICAgICAgICAvLyBLZWVwIHJlZmVyZW5jZSB0byBhY3R1YWwgU3R5bGVTaGVldCBvYmplY3QgKGBzdHlsZVNoZWV0YCBmb3IgSUUgPCA5KVxuICAgICAgICBleHRyYVNoZWV0ID0gZXh0cmFTaGVldC5zaGVldCB8fCBleHRyYVNoZWV0LnN0eWxlU2hlZXQ7XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gKGV4dHJhU2hlZXQuY3NzUnVsZXMgfHwgZXh0cmFTaGVldC5ydWxlcykubGVuZ3RoO1xuICAgIGV4dHJhU2hlZXQuaW5zZXJ0UnVsZShjc3MsIGluZGV4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRSdWxlOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEJhbGxQdWxzZUxvYWRlcjogcmVxdWlyZSgnLi9CYWxsUHVsc2VMb2FkZXInKSxcbiAgICBCYWxsUm90YXRlTG9hZGVyOiByZXF1aXJlKCcuL0JhbGxSb3RhdGVMb2FkZXInKSxcbiAgICBCYWxsQmVhdExvYWRlcjogcmVxdWlyZSgnLi9CYWxsQmVhdExvYWRlcicpLFxuICAgIEJhbGxQdWxzZVJpc2VMb2FkZXI6IHJlcXVpcmUoJy4vQmFsbFB1bHNlUmlzZUxvYWRlcicpLFxuICAgIEJhbGxQdWxzZVN5bmNMb2FkZXI6IHJlcXVpcmUoJy4vQmFsbFB1bHNlU3luY0xvYWRlcicpLFxuICAgIEJhbGxHcmlkUHVsc2VMb2FkZXI6IHJlcXVpcmUoJy4vQmFsbEdyaWRQdWxzZUxvYWRlcicpLFxuICAgIEJhbGxDbGlwUm90YXRlTG9hZGVyOiByZXF1aXJlKCcuL0JhbGxDbGlwUm90YXRlTG9hZGVyJyksXG4gICAgU3F1YXJlTG9hZGVyOiByZXF1aXJlKCcuL1NxdWFyZUxvYWRlcicpLFxuICAgIFBhY21hbkxvYWRlcjogcmVxdWlyZSgnLi9QYWNtYW5Mb2FkZXInKSxcbiAgICBUcmlhbmdsZVNrZXdMb2FkZXI6IHJlcXVpcmUoJy4vVHJpYW5nbGVTa2V3TG9hZGVyJyksXG4gICAgTGluZUZhZGVMb2FkZXI6IHJlcXVpcmUoJy4vTGluZUZhZGVMb2FkZXInKSxcbiAgICBMaW5lU2NhbGVMb2FkZXI6IHJlcXVpcmUoJy4vTGluZVNjYWxlTG9hZGVyJylcbn07XG4iXX0=
