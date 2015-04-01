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
            //lineNumbers: true,
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

},{"react":false}]},{},["./example/src/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBzZWxmQ2xlYW5pbmdUaW1lb3V0ID0ge1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJRCk7XG4gICAgfSxcblxuICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SUQpO1xuICAgICAgICB0aGlzLnRpbWVvdXRJRCA9IHNldFRpbWVvdXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG59O1xuXG52YXIgQ29tcG9uZW50UHJldmlldyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJDb21wb25lbnRQcmV2aWV3XCIsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvZGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuICAgIH0sXG5cbiAgICBtaXhpbnM6IFtzZWxmQ2xlYW5pbmdUaW1lb3V0XSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwibW91bnRcIn0pO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXhlY3V0ZUNvZGUoKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbihwcmV2UHJvcHMpIHtcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIG9ubHkgd2hlbiB0aGUgc3RhdGUncyBub3QgYmVpbmcgdXBkYXRlZCBieSBzd2l0Y2hpbmcgdGFiXG4gICAgICAgIC8vIHRoaXMgYXZvaWRzIHJlLWRpc3BsYXlpbmcgdGhlIGVycm9yLCB3aGljaCBjb21lcyBhZnRlciBhIGNlcnRhaW4gZGVsYXlcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29kZSAhPT0gcHJldlByb3BzLmNvZGUpIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUNvZGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21waWxlQ29kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBKU1hUcmFuc2Zvcm1lci50cmFuc2Zvcm0oXG4gICAgICAgICAgICAgICAgJyhmdW5jdGlvbigpIHsnICtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNvZGUgK1xuICAgICAgICAgICAgICAgICdcXG59KSgpOycsXG4gICAgICAgICAgICB7IGhhcm1vbnk6IHRydWUgfVxuICAgICAgICApLmNvZGU7XG4gICAgfSxcblxuICAgIGV4ZWN1dGVDb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1vdW50Tm9kZSA9IHRoaXMucmVmcy5tb3VudC5nZXRET01Ob2RlKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFJlYWN0LnVubW91bnRDb21wb25lbnRBdE5vZGUobW91bnROb2RlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBjb21waWxlZENvZGUgPSB0aGlzLmNvbXBpbGVDb2RlKCk7XG4gICAgICAgICAgICBSZWFjdC5yZW5kZXIoZXZhbChjb21waWxlZENvZGUpLCBtb3VudE5vZGUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBSZWFjdC5yZW5kZXIoXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJwbGF5Z3JvdW5kRXJyb3JcIn0sIGVyci50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgICAgICAgbW91bnROb2RlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxudmFyIElTX01PQklMRSA9IChcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpXG4gICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcbiAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpXG4gICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcbiAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9XaW5kb3dzIFBob25lL2kpXG4gICAgKTtcblxudmFyIENvZGVNaXJyb3JFZGl0b3IgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiQ29kZU1pcnJvckVkaXRvclwiLFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKElTX01PQklMRSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEodGhpcy5yZWZzLmVkaXRvci5nZXRET01Ob2RlKCksIHtcbiAgICAgICAgICAgIG1vZGU6ICdqYXZhc2NyaXB0JyxcbiAgICAgICAgICAgIC8vbGluZU51bWJlcnM6IHRydWUsXG4gICAgICAgICAgICBsaW5lV3JhcHBpbmc6IHRydWUsXG4gICAgICAgICAgICBzbWFydEluZGVudDogZmFsc2UsICAvLyBqYXZhc2NyaXB0IG1vZGUgZG9lcyBiYWQgdGhpbmdzIHdpdGgganN4IGluZGVudHNcbiAgICAgICAgICAgIG1hdGNoQnJhY2tldHM6IHRydWUsXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5lZGl0b3Iub24oJ2NoYW5nZScsIHRoaXMuaGFuZGxlQ2hhbmdlKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNldFZhbHVlKHRoaXMucHJvcHMuY29kZVRleHQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZUNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5yZWFkT25seSAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuZWRpdG9yLmdldFZhbHVlKCkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHdyYXAgaW4gYSBkaXYgdG8gZnVsbHkgY29udGFpbiBDb2RlTWlycm9yXG4gICAgICAgIHZhciBlZGl0b3I7XG5cbiAgICAgICAgaWYgKElTX01PQklMRSkge1xuICAgICAgICAgICAgZWRpdG9yID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInByZVwiLCB7c3R5bGU6IHtvdmVyZmxvdzogJ3Njcm9sbCd9fSwgdGhpcy5wcm9wcy5jb2RlVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlZGl0b3IgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwge3JlZjogXCJlZGl0b3JcIiwgZGVmYXVsdFZhbHVlOiB0aGlzLnByb3BzLmNvZGVUZXh0fSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHRoaXMucHJvcHMuc3R5bGUsIGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jbGFzc05hbWV9LCBcbiAgICAgICAgICAgIGVkaXRvclxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICB9XG59KTtcblxudmFyIFJlYWN0UGxheWdyb3VuZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJSZWFjdFBsYXlncm91bmRcIixcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY29kZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuICAgIH0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogdGhpcy5wcm9wcy5jb2RlVGV4dFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBoYW5kbGVDb2RlQ2hhbmdlOiBmdW5jdGlvbihjb2RlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29kZTogY29kZVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2hhbmdlVGFiOiBmdW5jdGlvbigpe1xuICAgICAgICBpZih0aGlzLnN0YXRlLnRhYiA9PSAncHJldmlldycpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0YWI6ICdlZGl0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdGFiOiAncHJldmlldydcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHRhYlRleHQgPSB0aGlzLnN0YXRlLnRhYiA9PSAncHJldmlldyc/ICdMaXZlIFByZXZpZXcnOiAnTGl2ZSBFZGl0JztcbiAgICAgICAgdmFyIGNvZGUgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicGxheWdyb3VuZENvZGVcIn0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2RlTWlycm9yRWRpdG9yLCB7a2V5OiBcImpzeFwiLCBcbiAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNvZGVDaGFuZ2UsIFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInBsYXlncm91bmRTdGFnZVwiLCBcbiAgICAgICAgICAgIGNvZGVUZXh0OiB0aGlzLnN0YXRlLmNvZGV9KVxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBwcmV2aWV3ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInBsYXlncm91bmRQcmV2aWV3XCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50UHJldmlldywge2NvZGU6IHRoaXMuc3RhdGUuY29kZX0pXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInBsYXlncm91bmRcIn0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInBsYXlncm91bmRUYWJcIiwgb25DbGljazogdGhpcy5jaGFuZ2VUYWJ9LCB0YWJUZXh0KSwgXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRhYiA9PSAncHJldmlldyc/IGNvZGU6IHByZXZpZXdcbiAgICAgICAgIClcbiAgICAgICk7XG4gICAgfVxufSk7XG5cbmZvcih2YXIgaWQ9MTsgaWQ8MTA7IGlkKyspe1xuICAgIHZhciBleGFtcGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnK2lkKTtcbiAgICBpZihleGFtcGxlKXtcbiAgICAgICAgUmVhY3QucmVuZGVyKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdFBsYXlncm91bmQsIHtjb2RlVGV4dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvZGUnK2lkKS5pbm5lckhUTUx9KSxcbiAgICAgICAgICAgIGV4YW1wbGVcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
