// myEditor.js
import React, { Component } from "react";
import { EditorState, Modifier, AtomicBlockUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import PropTypes from "prop-types";

class CustomOption extends Component {
  state = {
    entityData: null,
  };
  componentDidMount() {
    const self = this;
    window.addEventListener("message", (e) => {
      e.preventDefault();
      if (e.origin !== "http://localhost:4000") return false;
      console.log(e);
      self.setState({ entityData: JSON.parse(e.data) }, () =>
        console.log(self.state.entityData)
      );
      localStorage.setItem("entityData", e.data);
      console.log(localStorage.getItem("entityData"));
    });
  }

  addImage = () => {
    const { editorState, onChange } = this.props;
    const entityData = JSON.parse(localStorage.getItem("entityData"));
    console.log(JSON.stringify(entityData));
    const entityKey = editorState
      .getCurrentContent()
      .createEntity("IMAGE", "MUTABLE", entityData)
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      " "
    );
    onChange(newEditorState);
  };
  render() {
    return <div onClick={this.addImage}>⭐</div>;
  }
}

class MyEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };
  onEditorStateChange = (editorState) => {
    console.log(editorState);
    this.setState({ editorState });
  };
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="rich-editor demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          placeholder="The message goes here..."
          toolbarCustomButtons={[<CustomOption />]}
        />
      </div>
    );
  }
}
export { MyEditor };
