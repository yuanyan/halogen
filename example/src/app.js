var React = require('react');
var ReactDOM = require('react-dom');

var selfCleaningTimeout = {
    componentDidUpdate: function() {
        clearTimeout(this.timeoutID);
    },

    setTimeout: function() {
        clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout.apply(null, arguments);
    }
};

var ComponentPreview = React.createClass({
    propTypes: {
        code: React.PropTypes.string.isRequired
    },

    mixins: [selfCleaningTimeout],

    render: function() {
        return <div ref="mount" />;
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
        var mountNode = this.refs.mount;

        try {
            ReactDOM.unmountComponentAtNode(mountNode);
        } catch (e) { }

        try {
            var compiledCode = this.compileCode();
            ReactDOM.render(eval(compiledCode), mountNode);
        } catch (err) {
            debugger
            this.setTimeout(function() {
                ReactDOM.render(
                    <div className="playgroundError">{err.toString()}</div>,
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

var CodeMirrorEditor = React.createClass({
    componentDidMount: function() {
        if (IS_MOBILE) return;

        this.editor = CodeMirror.fromTextArea(this.refs.editor, {
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
            editor = <pre style={{overflow: 'scroll'}}>{this.props.codeText}</pre>;
        } else {
            editor = <textarea ref="editor" defaultValue={this.props.codeText} />;
        }

        return (
            <div style={this.props.style} className={this.props.className}>
            {editor}
            </div>
            );
    }
});

var ReactPlayground = React.createClass({
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
        var code = <div className="playgroundCode">
            <CodeMirrorEditor key="jsx"
            onChange={this.handleCodeChange}
            className="playgroundStage"
            codeText={this.state.code} />
        </div>;

        var preview = <div className="playgroundPreview">
            <ComponentPreview code={this.state.code} />
        </div>

        return (
         <div className="playground">
            <div className="playgroundTab" onClick={this.changeTab}><span className="blur">{tabText}</span></div>
            {this.state.tab == 'preview'? code: preview}
         </div>
      );
    }
});

for(var id=1; id<10; id++){
    var example = document.getElementById('example'+id);
    if(example){
        ReactDOM.render(
            <ReactPlayground codeText={document.getElementById('code'+id).innerHTML} />,
            example
        );
    }
}
