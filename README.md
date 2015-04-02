Halogen
=======

Delightful and performance-focused loading animations. Inspired by [loaders.css](http://connoratherton.com/loaders)

## Demo & Examples

Live demo: [yuanyan.github.io/halogen](http://yuanyan.github.io/halogen/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:9999`](http://localhost:9999) in a browser.

## Installation

The easiest way to use `halogen` is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/halogen.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install halogen --save
```

## Usage

```
var Loader = require('halogen/BallPulseLoader');
var Example = React.createClass({
    render: function() {
        return (
            <Loader color="#26A65B" size="16px" margin="4px"/>
        );
    }
});
```

## Loaders

* BallPulseLoader
* BallRotateLoader
* BallBeatLoader
* BallPulseRiseLoader
* BallPulseSyncLoader
* BallGridPulseLoader
* BallClipRotateLoader
* SquareLoader
* PacmanLoader
* TriangleSkewLoader
* LineFadeLoader
* LineScaleLoader
