require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./example/src/app.js":[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var selfCleaningTimeout = {
    componentDidUpdate: function componentDidUpdate() {
        clearTimeout(this.timeoutID);
    },

    setTimeout: function (_setTimeout) {
        function setTimeout() {
            return _setTimeout.apply(this, arguments);
        }

        setTimeout.toString = function () {
            return _setTimeout.toString();
        };

        return setTimeout;
    }(function () {
        clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout.apply(null, arguments);
    })
};

var ComponentPreview = React.createClass({
    displayName: 'ComponentPreview',

    propTypes: {
        code: React.PropTypes.string.isRequired
    },

    mixins: [selfCleaningTimeout],

    render: function render() {
        return React.createElement('div', { ref: 'mount' });
    },

    componentDidMount: function componentDidMount() {
        this.executeCode();
    },

    componentDidUpdate: function componentDidUpdate(prevProps) {
        // execute code only when the state's not being updated by switching tab
        // this avoids re-displaying the error, which comes after a certain delay
        if (this.props.code !== prevProps.code) {
            this.executeCode();
        }
    },

    compileCode: function compileCode() {
        return JSXTransformer.transform('(function() {' + this.props.code + '\n})();', { harmony: true }).code;
    },

    executeCode: function executeCode() {
        var mountNode = this.refs.mount;

        try {
            ReactDOM.unmountComponentAtNode(mountNode);
        } catch (e) {}

        try {
            var compiledCode = this.compileCode();
            ReactDOM.render(eval(compiledCode), mountNode);
        } catch (err) {
            debugger;
            this.setTimeout(function () {
                ReactDOM.render(React.createElement(
                    'div',
                    { className: 'playgroundError' },
                    err.toString()
                ), mountNode);
            }, 500);
        }
    }
});

var IS_MOBILE = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);

var CodeMirrorEditor = React.createClass({
    displayName: 'CodeMirrorEditor',

    componentDidMount: function componentDidMount() {
        if (IS_MOBILE) return;

        this.editor = CodeMirror.fromTextArea(this.refs.editor, {
            mode: 'javascript',
            //lineNumbers: true,
            viewportMargin: Infinity,
            lineWrapping: true,
            smartIndent: false, // javascript mode does bad things with jsx indents
            matchBrackets: true,
            readOnly: this.props.readOnly
        });
        this.editor.on('change', this.handleChange);
    },

    componentDidUpdate: function componentDidUpdate() {
        if (this.props.readOnly) {
            this.editor.setValue(this.props.codeText);
        }
    },

    handleChange: function handleChange() {
        if (!this.props.readOnly && this.props.onChange) {
            this.props.onChange(this.editor.getValue());
        }
    },

    render: function render() {
        // wrap in a div to fully contain CodeMirror
        var editor;

        if (IS_MOBILE) {
            editor = React.createElement(
                'pre',
                { style: { overflow: 'scroll' } },
                this.props.codeText
            );
        } else {
            editor = React.createElement('textarea', { ref: 'editor', defaultValue: this.props.codeText });
        }

        return React.createElement(
            'div',
            { style: this.props.style, className: this.props.className },
            editor
        );
    }
});

var ReactPlayground = React.createClass({
    displayName: 'ReactPlayground',

    propTypes: {
        codeText: React.PropTypes.string.isRequired
    },

    getInitialState: function getInitialState() {
        return {
            code: this.props.codeText
        };
    },

    handleCodeChange: function handleCodeChange(code) {
        this.setState({
            code: code
        });
    },

    changeTab: function changeTab() {
        if (this.state.tab == 'preview') this.setState({
            tab: 'edit'
        });else this.setState({
            tab: 'preview'
        });
    },

    render: function render() {

        var tabText = this.state.tab == 'preview' ? 'Live Preview' : 'Live Edit';
        var code = React.createElement(
            'div',
            { className: 'playgroundCode' },
            React.createElement(CodeMirrorEditor, { key: 'jsx',
                onChange: this.handleCodeChange,
                className: 'playgroundStage',
                codeText: this.state.code })
        );

        var preview = React.createElement(
            'div',
            { className: 'playgroundPreview' },
            React.createElement(ComponentPreview, { code: this.state.code })
        );

        return React.createElement(
            'div',
            { className: 'playground' },
            React.createElement(
                'div',
                { className: 'playgroundTab', onClick: this.changeTab },
                React.createElement(
                    'span',
                    { className: 'blur' },
                    tabText
                )
            ),
            this.state.tab == 'preview' ? code : preview
        );
    }
});

for (var id = 1; id < 10; id++) {
    var example = document.getElementById('example' + id);
    if (example) {
        ReactDOM.render(React.createElement(ReactPlayground, { codeText: document.getElementById('code' + id).innerHTML }), example);
    }
}

},{"react":false,"react-dom":false}]},{},["./example/src/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjtBQUNKLElBQUksV0FBVyxRQUFRLFdBQVIsQ0FBWDs7QUFFSixJQUFJLHNCQUFzQjtBQUN0Qix3QkFBb0IsOEJBQVc7QUFDM0IscUJBQWEsS0FBSyxTQUFMLENBQWIsQ0FEMkI7S0FBWDs7QUFJcEI7Ozs7Ozs7Ozs7TUFBWSxZQUFXO0FBQ25CLHFCQUFhLEtBQUssU0FBTCxDQUFiLENBRG1CO0FBRW5CLGFBQUssU0FBTCxHQUFpQixXQUFXLEtBQVgsQ0FBaUIsSUFBakIsRUFBdUIsU0FBdkIsQ0FBakIsQ0FGbUI7S0FBWCxDQUFaO0NBTEE7O0FBV0osSUFBSSxtQkFBbUIsTUFBTSxXQUFOLENBQWtCOzs7QUFDckMsZUFBVztBQUNQLGNBQU0sTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0tBRFY7O0FBSUEsWUFBUSxDQUFDLG1CQUFELENBQVI7O0FBRUEsWUFBUSxrQkFBVztBQUNmLGVBQU8sNkJBQUssS0FBSSxPQUFKLEVBQUwsQ0FBUCxDQURlO0tBQVg7O0FBSVIsdUJBQW1CLDZCQUFXO0FBQzFCLGFBQUssV0FBTCxHQUQwQjtLQUFYOztBQUluQix3QkFBb0IsNEJBQVMsU0FBVCxFQUFvQjs7O0FBR3BDLFlBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxLQUFvQixVQUFVLElBQVYsRUFBZ0I7QUFDcEMsaUJBQUssV0FBTCxHQURvQztTQUF4QztLQUhnQjs7QUFRcEIsaUJBQWEsdUJBQVc7QUFDcEIsZUFBTyxlQUFlLFNBQWYsQ0FDQyxrQkFDQSxLQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQ0EsU0FGQSxFQUdKLEVBQUUsU0FBUyxJQUFULEVBSkMsRUFLTCxJQUxLLENBRGE7S0FBWDs7QUFTYixpQkFBYSx1QkFB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LENBZGU7S0FBWDtDQTVCVSxDQUFsQjs7QUFtREosS0FBSSxJQUFJLEtBQUcsQ0FBSCxFQUFNLEtBQUcsRUFBSCxFQUFPLElBQXJCLEVBQTBCO0FBQ3RCLFFBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsWUFBVSxFQUFWLENBQWxDLENBRGtCO0FBRXRCLFFBQUcsT0FBSCxFQUFXO0FBQ1AsaUJBQVMsTUFBVCxDQUNJLG9CQUFDLGVBQUQsSUFBaUIsVUFBVSxTQUFTLGNBQVQsQ0FBd0IsU0FBTyxFQUFQLENBQXhCLENBQW1DLFNBQW5DLEVBQTNCLENBREosRUFFSSxPQUZKLEVBRE87S0FBWDtDQUZKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIHNlbGZDbGVhbmluZ1RpbWVvdXQgPSB7XG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElEKTtcbiAgICB9LFxuXG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJRCk7XG4gICAgICAgIHRoaXMudGltZW91dElEID0gc2V0VGltZW91dC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbn07XG5cbnZhciBDb21wb25lbnRQcmV2aWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjb2RlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgICB9LFxuXG4gICAgbWl4aW5zOiBbc2VsZkNsZWFuaW5nVGltZW91dF0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gPGRpdiByZWY9XCJtb3VudFwiIC8+O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXhlY3V0ZUNvZGUoKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbihwcmV2UHJvcHMpIHtcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIG9ubHkgd2hlbiB0aGUgc3RhdGUncyBub3QgYmVpbmcgdXBkYXRlZCBieSBzd2l0Y2hpbmcgdGFiXG4gICAgICAgIC8vIHRoaXMgYXZvaWRzIHJlLWRpc3BsYXlpbmcgdGhlIGVycm9yLCB3aGljaCBjb21lcyBhZnRlciBhIGNlcnRhaW4gZGVsYXlcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29kZSAhPT0gcHJldlByb3BzLmNvZGUpIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0ZUNvZGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21waWxlQ29kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBKU1hUcmFuc2Zvcm1lci50cmFuc2Zvcm0oXG4gICAgICAgICAgICAgICAgJyhmdW5jdGlvbigpIHsnICtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNvZGUgK1xuICAgICAgICAgICAgICAgICdcXG59KSgpOycsXG4gICAgICAgICAgICB7IGhhcm1vbnk6IHRydWUgfVxuICAgICAgICApLmNvZGU7XG4gICAgfSxcblxuICAgIGV4ZWN1dGVDb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1vdW50Tm9kZSA9IHRoaXMucmVmcy5tb3VudDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShtb3VudE5vZGUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNvbXBpbGVkQ29kZSA9IHRoaXMuY29tcGlsZUNvZGUoKTtcbiAgICAgICAgICAgIFJlYWN0RE9NLnJlbmRlcihldmFsKGNvbXBpbGVkQ29kZSksIG1vdW50Tm9kZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWdyb3VuZEVycm9yXCI+e2Vyci50b1N0cmluZygpfTwvZGl2PixcbiAgICAgICAgICAgICAgICAgICAgbW91bnROb2RlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxudmFyIElTX01PQklMRSA9IChcbiAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpXG4gICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSlcbiAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpXG4gICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcbiAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9XaW5kb3dzIFBob25lL2kpXG4gICAgKTtcblxudmFyIENvZGVNaXJyb3JFZGl0b3IgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoSVNfTU9CSUxFKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5lZGl0b3IgPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYSh0aGlzLnJlZnMuZWRpdG9yLCB7XG4gICAgICAgICAgICBtb2RlOiAnamF2YXNjcmlwdCcsXG4gICAgICAgICAgICAvL2xpbmVOdW1iZXJzOiB0cnVlLFxuICAgICAgICAgICAgdmlld3BvcnRNYXJnaW46IEluZmluaXR5LFxuICAgICAgICAgICAgbGluZVdyYXBwaW5nOiB0cnVlLFxuICAgICAgICAgICAgc21hcnRJbmRlbnQ6IGZhbHNlLCAgLy8gamF2YXNjcmlwdCBtb2RlIGRvZXMgYmFkIHRoaW5ncyB3aXRoIGpzeCBpbmRlbnRzXG4gICAgICAgICAgICBtYXRjaEJyYWNrZXRzOiB0cnVlLFxuICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLm9uKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZUNoYW5nZSk7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRWYWx1ZSh0aGlzLnByb3BzLmNvZGVUZXh0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucmVhZE9ubHkgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLmVkaXRvci5nZXRWYWx1ZSgpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyB3cmFwIGluIGEgZGl2IHRvIGZ1bGx5IGNvbnRhaW4gQ29kZU1pcnJvclxuICAgICAgICB2YXIgZWRpdG9yO1xuXG4gICAgICAgIGlmIChJU19NT0JJTEUpIHtcbiAgICAgICAgICAgIGVkaXRvciA9IDxwcmUgc3R5bGU9e3tvdmVyZmxvdzogJ3Njcm9sbCd9fT57dGhpcy5wcm9wcy5jb2RlVGV4dH08L3ByZT47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlZGl0b3IgPSA8dGV4dGFyZWEgcmVmPVwiZWRpdG9yXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmNvZGVUZXh0fSAvPjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5cbiAgICAgICAgICAgIHtlZGl0b3J9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgfVxufSk7XG5cbnZhciBSZWFjdFBsYXlncm91bmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvZGVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgICB9LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvZGU6IHRoaXMucHJvcHMuY29kZVRleHRcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQ29kZUNoYW5nZTogZnVuY3Rpb24oY29kZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNvZGU6IGNvZGVcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNoYW5nZVRhYjogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYodGhpcy5zdGF0ZS50YWIgPT0gJ3ByZXZpZXcnKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdGFiOiAnZWRpdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRhYjogJ3ByZXZpZXcnXG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciB0YWJUZXh0ID0gdGhpcy5zdGF0ZS50YWIgPT0gJ3ByZXZpZXcnPyAnTGl2ZSBQcmV2aWV3JzogJ0xpdmUgRWRpdCc7XG4gICAgICAgIHZhciBjb2RlID0gPGRpdiBjbGFzc05hbWU9XCJwbGF5Z3JvdW5kQ29kZVwiPlxuICAgICAgICAgICAgPENvZGVNaXJyb3JFZGl0b3Iga2V5PVwianN4XCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwbGF5Z3JvdW5kU3RhZ2VcIlxuICAgICAgICAgICAgY29kZVRleHQ9e3RoaXMuc3RhdGUuY29kZX0gLz5cbiAgICAgICAgPC9kaXY+O1xuXG4gICAgICAgIHZhciBwcmV2aWV3ID0gPGRpdiBjbGFzc05hbWU9XCJwbGF5Z3JvdW5kUHJldmlld1wiPlxuICAgICAgICAgICAgPENvbXBvbmVudFByZXZpZXcgY29kZT17dGhpcy5zdGF0ZS5jb2RlfSAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5Z3JvdW5kXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlncm91bmRUYWJcIiBvbkNsaWNrPXt0aGlzLmNoYW5nZVRhYn0+PHNwYW4gY2xhc3NOYW1lPVwiYmx1clwiPnt0YWJUZXh0fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLnRhYiA9PSAncHJldmlldyc/IGNvZGU6IHByZXZpZXd9XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxufSk7XG5cbmZvcih2YXIgaWQ9MTsgaWQ8MTA7IGlkKyspe1xuICAgIHZhciBleGFtcGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnK2lkKTtcbiAgICBpZihleGFtcGxlKXtcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgPFJlYWN0UGxheWdyb3VuZCBjb2RlVGV4dD17ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvZGUnK2lkKS5pbm5lckhUTUx9IC8+LFxuICAgICAgICAgICAgZXhhbXBsZVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
