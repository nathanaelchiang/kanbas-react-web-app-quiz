import React from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./styles.css";

interface EditorComponentProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({
  editorState,
  setEditorState,
}) => {
  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
    />
  );
};

export default EditorComponent;
