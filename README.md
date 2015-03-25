React Loaders
=============

Delightful and performance-focused pure css loading animations. Inspired by [http://connoratherton.com/loaders]

## Demo & Examples

Live demo: [yuanyan.github.io/react-stylist](http://yuanyan.github.io/react-loaders/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:9999`](http://localhost:9999) in a browser.

## Installation

The easiest way to use `react-loaders` is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/react-loaders.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-loaders --save
```

## Usage

```
var Loaders = require('react-loaders');
var Example = React.createClass({
    render: function() {
        var style = {
            width: 120,
            height: 120,
            display: 'inline-block'
        };
        return (
        <div>
            <div>
                <div style={style}><Loaders.BallPulseLoader color="#26A65B"/></div>
                <div style={style}><Loaders.BallGridPulseLoader color="#049372"/></div>
                <div style={style}><Loaders.BallClipRotateLoader color="#8DB255"/></div>
                <div style={style}><Loaders.SquareSpinLoader color="#8DB255"/></div>
                <div style={style}><Loaders.LineScaleLoader color="#006442"/></div>
            </div>
            <div>
                <div style={style}><Loaders.LineSpinFadeLoader color="#4DAF7C"/></div>
            </div>
        </div>
        );
    }
});
```

## Properties

* `styles`: Your style sheets.
