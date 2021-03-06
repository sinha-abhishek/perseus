/**
 * Demo for the multi-item multirenderer layout.
 */
/* eslint-disable no-console */
const React = require("react");

const MultiRendererEditor = require("./multirenderer-editor.jsx");
const Util = require("./util.js");

const defaultQuestion = {
    "left": {
        "content": "",
        "images": {},
        "widgets": {},
    },
    "right": [{
        "content": "",
        "images": {},
        "widgets": {},
    }],
};

const MultiRendererDemo = React.createClass({
    propTypes: {
        content: React.PropTypes.any.isRequired,
    },

    getDefaultProps() {
        return {
            content: defaultQuestion,
        };
    },

    getInitialState() {
        return {
            content: this.props.content,
            editorMode: "edit",
        };
    },

    getEditorProps() {
        return {
            apiOptions: {
                onFocusChange: function(newPath, oldPath) {
                    console.log("onFocusChange", newPath, oldPath);
                },
                trackInteraction: function(trackData) {
                    console.log("Interaction with", trackData.type,
                                trackData);
                },
            },

            content: this.state.content,
            editorMode: this.state.editorMode,
        };
    },

    handleChange(newState) {
        this.setState(newState);
    },

    _getContentHash: function() {
        return Util.strongEncodeURIComponent(
            // TODO(emily): this.editor.serialize()
            JSON.stringify(this.state.content)
        );
    },

    handlePermalink(e) {
        window.location.hash = `content=${this._getContentHash()}`;
        e.preventDefault();
    },

    render() {
        return <div>
            <div id="extras">
                <button onClick={this.handlePermalink}>permalink</button>
            </div>
            <div className="framework-perseus">
                <MultiRendererEditor
                    {...this.getEditorProps()}
                    onChange={this.handleChange}
                    ref={e => this.editor = e}
                />
            </div>
        </div>;
    },
});

module.exports = MultiRendererDemo;
