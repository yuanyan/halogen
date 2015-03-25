var insertRule = require('./insertRule');

var vendorPrefix = '-webkit-';
var index = 0;

function insertKeyframesRule(keyframes) {
    // random name
    var name = 'anim'+ (++index) + (+new Date);
    var css = "@" + vendorPrefix + "keyframes " + name + " {";

    for (var key in keyframes) {
        css += key + " {";

        for (var property in keyframes[key]) {
            css += property + ":" + keyframes[key][property] + ";";
        }

        css += "}";
    }

    css += "}";

    insertRule(css);

    return name
}

module.exports = insertKeyframesRule;