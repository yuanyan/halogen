var React = require('react');
var assign = require('./assign');
var insertKeyframesRule = require('./insertKeyframesRule');

var keyframes = {
    '0%, 100%': {
        transform: 'scale(0)'
    },
    '50%': {
        transform: 'scale(1.0)'
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
            WebkitAnimation: animation,
            animationFillMode: animationFillMode,
            WebkitAnimationFillMode: animationFillMode
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
            <div style={this.getStyle()}>
                <div style={this.getStyle(1)}></div>
                <div style={this.getStyle(2)}></div>
            </div>);
    }
});

module.exports = Loader;
