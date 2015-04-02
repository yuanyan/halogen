require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            //lineNumbers: true,
            viewportMargin: Infinity,
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

    changeTab: function(){
        if(this.state.tab == 'preview')
            this.setState({
                tab: 'edit'
            })
        else
            this.setState({
                tab: 'preview'
            })
    },

    render: function() {

        var tabText = this.state.tab == 'preview'? 'Live Preview': 'Live Edit';
        var code = React.createElement("div", {className: "playgroundCode"}, 
            React.createElement(CodeMirrorEditor, {key: "jsx", 
            onChange: this.handleCodeChange, 
            className: "playgroundStage", 
            codeText: this.state.code})
        );

        var preview = React.createElement("div", {className: "playgroundPreview"}, 
            React.createElement(ComponentPreview, {code: this.state.code})
        )

        return (
         React.createElement("div", {className: "playground"}, 
            React.createElement("div", {className: "playgroundTab", onClick: this.changeTab}, tabText), 
            this.state.tab == 'preview'? code: preview
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

},{"react":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIHNlbGZDbGVhbmluZ1RpbWVvdXQgPSB7XG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElEKTtcbiAgICB9LFxuXG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJRCk7XG4gICAgICAgIHRoaXMudGltZW91dElEID0gc2V0VGltZW91dC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbn07XG5cbnZhciBDb21wb25lbnRQcmV2aWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkNvbXBvbmVudFByZXZpZXdcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29kZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gICAgfSxcblxuICAgIG1peGluczogW3NlbGZDbGVhbmluZ1RpbWVvdXRdLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJtb3VudFwifSk7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5leGVjdXRlQ29kZSgpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKHByZXZQcm9wcykge1xuICAgICAgICAvLyBleGVjdXRlIGNvZGUgb25seSB3aGVuIHRoZSBzdGF0ZSdzIG5vdCBiZWluZyB1cGRhdGVkIGJ5IHN3aXRjaGluZyB0YWJcbiAgICAgICAgLy8gdGhpcyBhdm9pZHMgcmUtZGlzcGxheWluZyB0aGUgZXJyb3IsIHdoaWNoIGNvbWVzIGFmdGVyIGEgY2VydGFpbiBkZWxheVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2RlICE9PSBwcmV2UHJvcHMuY29kZSkge1xuICAgICAgICAgICAgdGhpcy5leGVjdXRlQ29kZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNvbXBpbGVDb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEpTWFRyYW5zZm9ybWVyLnRyYW5zZm9ybShcbiAgICAgICAgICAgICAgICAnKGZ1bmN0aW9uKCkgeycgK1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY29kZSArXG4gICAgICAgICAgICAgICAgJ1xcbn0pKCk7JyxcbiAgICAgICAgICAgIHsgaGFybW9ueTogdHJ1ZSB9XG4gICAgICAgICkuY29kZTtcbiAgICB9LFxuXG4gICAgZXhlY3V0ZUNvZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbW91bnROb2RlID0gdGhpcy5yZWZzLm1vdW50LmdldERPTU5vZGUoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUmVhY3QudW5tb3VudENvbXBvbmVudEF0Tm9kZShtb3VudE5vZGUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNvbXBpbGVkQ29kZSA9IHRoaXMuY29tcGlsZUNvZGUoKTtcbiAgICAgICAgICAgIFJlYWN0LnJlbmRlcihldmFsKGNvbXBpbGVkQ29kZSksIG1vdW50Tm9kZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIFJlYWN0LnJlbmRlcihcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInBsYXlncm91bmRFcnJvclwifSwgZXJyLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICAgICAgICBtb3VudE5vZGVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG52YXIgSVNfTU9CSUxFID0gKFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcbiAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC93ZWJPUy9pKVxuICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZS9pKVxuICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcbiAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXG4gICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQmxhY2tCZXJyeS9pKVxuICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSlcbiAgICApO1xuXG52YXIgQ29kZU1pcnJvckVkaXRvciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJDb2RlTWlycm9yRWRpdG9yXCIsXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoSVNfTU9CSUxFKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5lZGl0b3IgPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYSh0aGlzLnJlZnMuZWRpdG9yLmdldERPTU5vZGUoKSwge1xuICAgICAgICAgICAgbW9kZTogJ2phdmFzY3JpcHQnLFxuICAgICAgICAgICAgLy9saW5lTnVtYmVyczogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXdwb3J0TWFyZ2luOiBJbmZpbml0eSxcbiAgICAgICAgICAgIGxpbmVXcmFwcGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHNtYXJ0SW5kZW50OiBmYWxzZSwgIC8vIGphdmFzY3JpcHQgbW9kZSBkb2VzIGJhZCB0aGluZ3Mgd2l0aCBqc3ggaW5kZW50c1xuICAgICAgICAgICAgbWF0Y2hCcmFja2V0czogdHJ1ZSxcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVkaXRvci5vbignY2hhbmdlJywgdGhpcy5oYW5kbGVDaGFuZ2UpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VmFsdWUodGhpcy5wcm9wcy5jb2RlVGV4dCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJlYWRPbmx5ICYmIHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5lZGl0b3IuZ2V0VmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gd3JhcCBpbiBhIGRpdiB0byBmdWxseSBjb250YWluIENvZGVNaXJyb3JcbiAgICAgICAgdmFyIGVkaXRvcjtcblxuICAgICAgICBpZiAoSVNfTU9CSUxFKSB7XG4gICAgICAgICAgICBlZGl0b3IgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwicHJlXCIsIHtzdHlsZToge292ZXJmbG93OiAnc2Nyb2xsJ319LCB0aGlzLnByb3BzLmNvZGVUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRvciA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7cmVmOiBcImVkaXRvclwiLCBkZWZhdWx0VmFsdWU6IHRoaXMucHJvcHMuY29kZVRleHR9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSwgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZX0sIFxuICAgICAgICAgICAgZWRpdG9yXG4gICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgIH1cbn0pO1xuXG52YXIgUmVhY3RQbGF5Z3JvdW5kID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlJlYWN0UGxheWdyb3VuZFwiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2RlVGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiB0aGlzLnByb3BzLmNvZGVUZXh0XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGhhbmRsZUNvZGVDaGFuZ2U6IGZ1bmN0aW9uKGNvZGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjb2RlOiBjb2RlXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjaGFuZ2VUYWI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUudGFiID09ICdwcmV2aWV3JylcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRhYjogJ2VkaXQnXG4gICAgICAgICAgICB9KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0YWI6ICdwcmV2aWV3J1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgdGFiVGV4dCA9IHRoaXMuc3RhdGUudGFiID09ICdwcmV2aWV3Jz8gJ0xpdmUgUHJldmlldyc6ICdMaXZlIEVkaXQnO1xuICAgICAgICB2YXIgY29kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJwbGF5Z3JvdW5kQ29kZVwifSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvZGVNaXJyb3JFZGl0b3IsIHtrZXk6IFwianN4XCIsIFxuICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ29kZUNoYW5nZSwgXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicGxheWdyb3VuZFN0YWdlXCIsIFxuICAgICAgICAgICAgY29kZVRleHQ6IHRoaXMuc3RhdGUuY29kZX0pXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHByZXZpZXcgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicGxheWdyb3VuZFByZXZpZXdcIn0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRQcmV2aWV3LCB7Y29kZTogdGhpcy5zdGF0ZS5jb2RlfSlcbiAgICAgICAgKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicGxheWdyb3VuZFwifSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicGxheWdyb3VuZFRhYlwiLCBvbkNsaWNrOiB0aGlzLmNoYW5nZVRhYn0sIHRhYlRleHQpLCBcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudGFiID09ICdwcmV2aWV3Jz8gY29kZTogcHJldmlld1xuICAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG59KTtcblxuZm9yKHZhciBpZD0xOyBpZDwxMDsgaWQrKyl7XG4gICAgdmFyIGV4YW1wbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScraWQpO1xuICAgIGlmKGV4YW1wbGUpe1xuICAgICAgICBSZWFjdC5yZW5kZXIoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0UGxheWdyb3VuZCwge2NvZGVUZXh0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29kZScraWQpLmlubmVySFRNTH0pLFxuICAgICAgICAgICAgZXhhbXBsZVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
