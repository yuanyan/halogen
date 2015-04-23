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

var Loader = React.createClass({
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },
    getDefaultProps: function(){
        return {
            loading: true,
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
    renderLoader: function(loading) {
        if(loading) {

            var style = {
                width: (parseFloat(this.props.size) * 3) + parseFloat(this.props.margin) * 6,
                fontSize: 0
            };

            return (
                <div {...this.props}>
                    <div style={style}>
                        <div style={this.getStyle(1)}></div>
                        <div style={this.getStyle(2)}></div>
                        <div style={this.getStyle(3)}></div>
                        <div style={this.getStyle(4)}></div>
                        <div style={this.getStyle(5)}></div>
                        <div style={this.getStyle(6)}></div>
                        <div style={this.getStyle(7)}></div>
                        <div style={this.getStyle(8)}></div>
                        <div style={this.getStyle(9)}></div>
                    </div>
                </div>
            );
        }

        return null;
    },
    render: function () {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;
