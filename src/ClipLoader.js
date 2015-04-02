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

var Loader = React.createClass({
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
        return <div style={this.getStyle()} />
    }
});

module.exports = Loader;
