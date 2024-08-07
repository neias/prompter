import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { navigate } from "gatsby";

const TextEditor = () => {
  const [style, setStyle] = useState({});
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef(null);

  const applyStyle = (newStyle) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    Object.assign(span.style, newStyle);
    range.surroundContents(span);
  };

  const onBold = () => applyStyle({ fontWeight: "bold" });
  const onItalic = () => applyStyle({ fontStyle: "italic" });

  const onUnderline = () => applyStyle({ textDecoration: "underline" });

  const onAlignCenter = () => {
    const editor = editorRef.current;
    if (editor) {
      editor.style.textAlign =
        editor.style.textAlign === "center" ? "left" : "center";
    }
  };

  const handleSave = () => {
    const content = editorRef.current.innerHTML;
    setEditorContent(content);
    const existingContent =
      JSON.parse(localStorage.getItem("editorContent")) || [];
    existingContent.push(content);
    localStorage.setItem("editorContent", JSON.stringify(existingContent));
    navigate("/");
  };

  return (
    <div className="flex gap-2">
      <div className="flex-none w-12">
        <button onClick={onBold}>
          <b>B</b>
        </button>
        <button onClick={onItalic}>
          <i>I</i>
        </button>
        <button onClick={onUnderline}>
          <u>U</u>
        </button>
        <button onClick={onAlignCenter}>A</button>
      </div>
      <div
        className="flex-1"
        ref={editorRef}
        contentEditable
        style={{
          ...style,
          minHeight: "200px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      />
      <Button variant="default" onClick={handleSave}>
        Kaydet
      </Button>
    </div>
  );
};

export default TextEditor;
