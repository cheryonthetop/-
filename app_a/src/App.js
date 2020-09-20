// App.js
import React from "react";
import { MyEditor } from "./Editor";
import "./App.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function App() {
  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Text Editor</h1>
      <MyEditor />
    </div>
  );
}
export default App;
