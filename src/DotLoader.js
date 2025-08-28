var React = require('react');
var PropTypes = require('prop-types');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var rotateKeyframes = {
    '100%': {
        transform: 'rotate(360deg)'
    }
};

/**
 * @type {Object}
 */
var bounceKeyframes = {
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
var rotateAnimationName = insertKeyframesRule(rotateKeyframes);

/**
 * @type {String}
 */
var bounceAnimationName = insertKeyframesRule(bounceKeyframes);

class Loader extends React.Component {
    /**
     * @param  {String} size
     * @return {Object}
     */
    getBallStyle(size) {
        return {
            backgroundColor: this.props.color,
            width: size,
            height: size,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        };
    }

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle(i) {
        var animation = [i==0 ? rotateAnimationName : bounceAnimationName, '2s', i==2? '-1s': '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        };
    }

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle(i) {
        var size = parseInt(this.props.size);
        var ballSize = size/2;

        if (i) {
            return assign(
                this.getBallStyle(ballSize),
                this.getAnimationStyle(i),
                {
                    position: 'absolute',
                    top: i%2? 0: 'auto',
                    bottom: i%2? 'auto': 0
                }
            );
        }

        return assign(
            this.getAnimationStyle(i),
            {
                width: size,
                height: size,
                position: 'relative'
            }
        );
    }

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader(loading) {
        if (loading) {
            return (
                <div id={this.props.id} className={this.props.className}>
                    <div style={this.getStyle(0)}>
                        <div style={this.getStyle(1)}></div>
                        <div style={this.getStyle(2)}></div>
                    </div>
                </div>
            );
        }

        return null;
    }

    render() {
        return this.renderLoader(this.props.loading);
    }
}

Loader.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
    margin: PropTypes.string
};

Loader.defaultProps = {
    loading: true,
    color: '#ffffff',
    size: '60px'
};

module.exports = Loader;