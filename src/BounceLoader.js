var React = require('react');
var PropTypes = require('prop-types');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '0%, 100%': {
        transform: 'scale(0)'
    },
    '50%': {
        transform: 'scale(1.0)'
    }
};

/**
 * @type {String}
 */
var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    /**
     * @type {Object}
     */
    propTypes: {
        loading: PropTypes.bool,
        color: PropTypes.string,
        size: PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function() {
        return {
            loading: true,
            color: '#ffffff',
            size: '60px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            borderRadius: '100%',
            opacity: 0.6,
            position: 'absolute',
            top: 0,
            left: 0,
            verticalAlign: this.props.verticalAlign
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function(i) {
        var animation = [animationName, '2s', i==1? '1s': '0s', 'infinite', 'ease-in-out'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function(i) {
        if (i) {
            return assign(
                this.getBallStyle(i),
                this.getAnimationStyle(i)
            );
        }

        return assign(
            {
                width: this.props.size,
                height: this.props.size,
                position: 'relative'
            }
        );
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function(loading) {
        if (loading) {
            return (
                <div id={this.props.id} className={this.props.className}>
                    <div style={this.getStyle()}>
                        <div style={this.getStyle(1)}></div>
                        <div style={this.getStyle(2)}></div>
                    </div>
                </div>
            );
        }

        return null;
    },

    render: function() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;
