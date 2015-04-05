var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

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
            <div style={this.getStyle(0)}>
                <div style={this.getStyle(1)}></div>
                <div style={this.getStyle(2)}></div>
            </div>);
    }
});

module.exports = Loader;
