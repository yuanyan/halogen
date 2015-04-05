Halogen
=======

A collection of loading spinners with React.js.

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

```javascript
var Loader = require('halogen/PulseLoader');
var Example = React.createClass({
  render: function() {
    return (
      <Loader color="#26A65B" size="16px" margin="4px"/>
    );
  }
});
```

## Loaders

* PulseLoader
* RotateLoader
* BeatLoader
* RiseLoader
* SyncLoader
* GridLoader
* ClipLoader
* FadeLoader
* ScaleLoader
* SquareLoader
* PacmanLoader
* SkewLoader
* RingLoader
* MoonLoader
* DotLoader
* BounceLoader

## Browser Support

![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 10+ ✔ | Chrome 4.0+ ✔ | Firefox 16.0+ ✔ | Opera 15.0+ ✔ | Safari 4.0+ ✔ |
