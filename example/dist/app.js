require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./example/src/app.js":[function(require,module,exports){
var React = require('react');

var selfCleaningTimeout = {
    componentDidUpdate: function() {
        clearTimeout(this.timeoutID);
    },

    setTimeout: function() {
        clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout.apply(null, arguments);
    }
};

var ComponentPreview = React.createClass({displayName: "ComponentPreview",
    propTypes: {
        code: React.PropTypes.string.isRequired
    },

    mixins: [selfCleaningTimeout],

    render: function() {
        return React.createElement("div", {ref: "mount"});
    },

    componentDidMount: function() {
        this.executeCode();
    },

    componentDidUpdate: function(prevProps) {
        // execute code only when the state's not being updated by switching tab
        // this avoids re-displaying the error, which comes after a certain delay
        if (this.props.code !== prevProps.code) {
            this.executeCode();
        }
    },

    compileCode: function() {
        return JSXTransformer.transform(
                '(function() {' +
                this.props.code +
                '\n})();',
            { harmony: true }
        ).code;
    },

    executeCode: function() {
        var mountNode = this.refs.mount.getDOMNode();

        try {
            React.unmountComponentAtNode(mountNode);
        } catch (e) { }

        try {
            var compiledCode = this.compileCode();
            React.render(eval(compiledCode), mountNode);
        } catch (err) {
            this.setTimeout(function() {
                React.render(
                    React.createElement("div", {className: "playgroundError"}, err.toString()),
                    mountNode
                );
            }, 500);
        }
    }
});

var IS_MOBILE = (
    navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    );

var CodeMirrorEditor = React.createClass({displayName: "CodeMirrorEditor",
    componentDidMount: function() {
        if (IS_MOBILE) return;

        this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
            mode: 'javascript',
            lineNumbers: true,
            lineWrapping: true,
            smartIndent: false,  // javascript mode does bad things with jsx indents
            matchBrackets: true,
            readOnly: this.props.readOnly
        });
        this.editor.on('change', this.handleChange);
    },

    componentDidUpdate: function() {
        if (this.props.readOnly) {
            this.editor.setValue(this.props.codeText);
        }
    },

    handleChange: function() {
        if (!this.props.readOnly && this.props.onChange) {
            this.props.onChange(this.editor.getValue());
        }
    },

    render: function() {
        // wrap in a div to fully contain CodeMirror
        var editor;

        if (IS_MOBILE) {
            editor = React.createElement("pre", {style: {overflow: 'scroll'}}, this.props.codeText);
        } else {
            editor = React.createElement("textarea", {ref: "editor", defaultValue: this.props.codeText});
        }

        return (
            React.createElement("div", {style: this.props.style, className: this.props.className}, 
            editor
            )
            );
    }
});

var ReactPlayground = React.createClass({displayName: "ReactPlayground",
    propTypes: {
        codeText: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            code: this.props.codeText
        };
    },

    handleCodeChange: function(code) {
        this.setState({
            code: code
        });
    },

    render: function() {
        return React.createElement("div", {className: "playground"}, 
            React.createElement("div", {className: "playgroundCode"}, 
                React.createElement(CodeMirrorEditor, {key: "jsx", 
                onChange: this.handleCodeChange, 
                className: "playgroundStage", 
                codeText: this.state.code})
            ), 
            React.createElement("div", {className: "playgroundPreview"}, 
                React.createElement(ComponentPreview, {code: this.state.code})
            )
        );
    }
});

for(var id=1; id<10; id++){
    var example = document.getElementById('example'+id);
    if(example){
        React.render(
            React.createElement(ReactPlayground, {codeText: document.getElementById('code'+id).innerHTML}),
            example
        );
    }
}

},{"react":false}]},{},["./example/src/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgc2VsZkNsZWFuaW5nVGltZW91dCA9IHtcbiAgICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SUQpO1xuICAgIH0sXG5cbiAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElEKTtcbiAgICAgICAgdGhpcy50aW1lb3V0SUQgPSBzZXRUaW1lb3V0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxufTtcblxudmFyIENvbXBvbmVudFByZXZpZXcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiQ29tcG9uZW50UHJldmlld1wiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2RlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgICB9LFxuXG4gICAgbWl4aW5zOiBbc2VsZkNsZWFuaW5nVGltZW91dF0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcIm1vdW50XCJ9KTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV4ZWN1dGVDb2RlKCk7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24ocHJldlByb3BzKSB7XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBvbmx5IHdoZW4gdGhlIHN0YXRlJ3Mgbm90IGJlaW5nIHVwZGF0ZWQgYnkgc3dpdGNoaW5nIHRhYlxuICAgICAgICAvLyB0aGlzIGF2b2lkcyByZS1kaXNwbGF5aW5nIHRoZSBlcnJvciwgd2hpY2ggY29tZXMgYWZ0ZXIgYSBjZXJ0YWluIGRlbGF5XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvZGUgIT09IHByZXZQcm9wcy5jb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVDb2RlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcGlsZUNvZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gSlNYVHJhbnNmb3JtZXIudHJhbnNmb3JtKFxuICAgICAgICAgICAgICAgICcoZnVuY3Rpb24oKSB7JyArXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jb2RlICtcbiAgICAgICAgICAgICAgICAnXFxufSkoKTsnLFxuICAgICAgICAgICAgeyBoYXJtb255OiB0cnVlIH1cbiAgICAgICAgKS5jb2RlO1xuICAgIH0sXG5cbiAgICBleGVjdXRlQ29kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtb3VudE5vZGUgPSB0aGlzLnJlZnMubW91bnQuZ2V0RE9NTm9kZSgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBSZWFjdC51bm1vdW50Q29tcG9uZW50QXROb2RlKG1vdW50Tm9kZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY29tcGlsZWRDb2RlID0gdGhpcy5jb21waWxlQ29kZSgpO1xuICAgICAgICAgICAgUmVhY3QucmVuZGVyKGV2YWwoY29tcGlsZWRDb2RlKSwgbW91bnROb2RlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgUmVhY3QucmVuZGVyKFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicGxheWdyb3VuZEVycm9yXCJ9LCBlcnIudG9TdHJpbmcoKSksXG4gICAgICAgICAgICAgICAgICAgIG1vdW50Tm9kZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbnZhciBJU19NT0JJTEUgPSAoXG4gICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxuICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3dlYk9TL2kpXG4gICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXG4gICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKVxuICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQb2QvaSlcbiAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXG4gICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvV2luZG93cyBQaG9uZS9pKVxuICAgICk7XG5cbnZhciBDb2RlTWlycm9yRWRpdG9yID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkNvZGVNaXJyb3JFZGl0b3JcIixcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChJU19NT0JJTEUpIHJldHVybjtcblxuICAgICAgICB0aGlzLmVkaXRvciA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKHRoaXMucmVmcy5lZGl0b3IuZ2V0RE9NTm9kZSgpLCB7XG4gICAgICAgICAgICBtb2RlOiAnamF2YXNjcmlwdCcsXG4gICAgICAgICAgICBsaW5lTnVtYmVyczogdHJ1ZSxcbiAgICAgICAgICAgIGxpbmVXcmFwcGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHNtYXJ0SW5kZW50OiBmYWxzZSwgIC8vIGphdmFzY3JpcHQgbW9kZSBkb2VzIGJhZCB0aGluZ3Mgd2l0aCBqc3ggaW5kZW50c1xuICAgICAgICAgICAgbWF0Y2hCcmFja2V0czogdHJ1ZSxcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVkaXRvci5vbignY2hhbmdlJywgdGhpcy5oYW5kbGVDaGFuZ2UpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VmFsdWUodGhpcy5wcm9wcy5jb2RlVGV4dCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJlYWRPbmx5ICYmIHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5lZGl0b3IuZ2V0VmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gd3JhcCBpbiBhIGRpdiB0byBmdWxseSBjb250YWluIENvZGVNaXJyb3JcbiAgICAgICAgdmFyIGVkaXRvcjtcblxuICAgICAgICBpZiAoSVNfTU9CSUxFKSB7XG4gICAgICAgICAgICBlZGl0b3IgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwicHJlXCIsIHtzdHlsZToge292ZXJmbG93OiAnc2Nyb2xsJ319LCB0aGlzLnByb3BzLmNvZGVUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRvciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7cmVmOiBcImVkaXRvclwiLCBkZWZhdWx0VmFsdWU6IHRoaXMucHJvcHMuY29kZVRleHR9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSwgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZX0sIFxuICAgICAgICAgICAgZWRpdG9yXG4gICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgIH1cbn0pO1xuXG52YXIgUmVhY3RQbGF5Z3JvdW5kID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlJlYWN0UGxheWdyb3VuZFwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2RlVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiB0aGlzLnByb3BzLmNvZGVUZXh0XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGhhbmRsZUNvZGVDaGFuZ2U6IGZ1bmN0aW9uKGNvZGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb2RlOiBjb2RlXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInBsYXlncm91bmRcIn0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInBsYXlncm91bmRDb2RlXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvZGVNaXJyb3JFZGl0b3IsIHtrZXk6IFwianN4XCIsIFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNvZGVDaGFuZ2UsIFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwbGF5Z3JvdW5kU3RhZ2VcIiwgXG4gICAgICAgICAgICAgICAgY29kZVRleHQ6IHRoaXMuc3RhdGUuY29kZX0pXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJwbGF5Z3JvdW5kUHJldmlld1wifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRQcmV2aWV3LCB7Y29kZTogdGhpcy5zdGF0ZS5jb2RlfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZm9yKHZhciBpZD0xOyBpZDwxMDsgaWQrKyl7XG4gICAgdmFyIGV4YW1wbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScraWQpO1xuICAgIGlmKGV4YW1wbGUpe1xuICAgICAgICBSZWFjdC5yZW5kZXIoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0UGxheWdyb3VuZCwge2NvZGVUZXh0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29kZScraWQpLmlubmVySFRNTH0pLFxuICAgICAgICAgICAgZXhhbXBsZVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
