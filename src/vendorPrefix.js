var div = document.createElement('div');
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
var cssVendorPrefix;
var domVendorPrefix;

// Helper function to get the proper vendor property name. (transition => WebkitTransition)
function getVendorPropertyName(prop) {

   if (prop in div.style) return prop;

   var prop = prop.charAt(0).toUpperCase() + prop.substr(1);
   if(domVendorPrefix){
       return domVendorPrefix + prop;
   }else{
       for (var i=0; i<prefixes.length; ++i) {
           var vendorProp = prefixes[i] + prop;
           if (vendorProp in div.style) {
               domVendorPrefix = prefixes[i];
               return vendorProp;
           }
       }
   }

}

function getVendorPrefix(){

    if(cssVendorPrefix) return cssVendorPrefix;

    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];

    return cssVendorPrefix = '-' + pre + '-';
}

function prefix(style){
    var prefixed = {};
    for (var key in style) {
        prefixed[getVendorPropertyName(key)] = style[key]
    }
    return prefixed
}

module.exports = {
    getVendorPropertyName: getVendorPropertyName,
    getVendorPrefix: getVendorPrefix,
    prefix: prefix
};
