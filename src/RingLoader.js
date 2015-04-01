var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

var keyframes = {
    '0%': {
        transform: 'perspective(1000px) rotate3d(1, 1, 1, 0deg)'
    },
    '100%': {
        transform: 'perspective(1000px) rotate3d(1, 1, 1, 360deg);'
    }
};

var keyframes2 = {
    '0%': {
        transform: 'perspective(1000px) rotate3d(-1, -1, -1, 0deg)'
    },
    '100%': {
        transform: 'perspective(1000px) rotate3d(-1, -1, -1, 360deg);'
    }
};


var animationName = insertKeyframesRule(keyframes);
var animationName2 = insertKeyframesRule(keyframes2);

var Loader = React.createClass({
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

        var animation = [i==1?animationName: animationName2, '2s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';
        return {
            animation: animation,
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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
            <div style={this.getStyle(0)}>
                <div style={this.getStyle(1)}></div>
                <div style={this.getStyle(2)}></div>
            </div>);
    }
});

module.exports = Loader;
