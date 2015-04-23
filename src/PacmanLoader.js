var React = require('react');
var assign = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var animations = {};

var Loader = React.createClass({
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.number,
        margin: React.PropTypes.number
    },
    getDefaultProps: function(){

        return {
            loading: true,
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
    renderLoader: function(loading) {
        if(loading) {

            var style = {
                position: 'relative',
                fontSize: 0
            };

            return (
                <div {...this.props}>
                    <div style={style}>
                        <div style={this.getStyle(1)}/>
                        <div style={this.getStyle(2)}/>
                        <div style={this.getStyle(3)}/>
                        <div style={this.getStyle(4)}/>
                        <div style={this.getStyle(5)}/>
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
