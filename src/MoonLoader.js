var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var keyframes = {
    '100%': {
        transform: 'rotate(360deg)'
    }
};


var animationName = insertKeyframesRule(keyframes);

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
    renderLoader: function(loading) {
        if(loading) {
            return (
                <div>
                    <div style={this.getStyle(0)}>
                        <div style={this.getStyle(1)}></div>
                        <div style={this.getStyle(2)}></div>
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
