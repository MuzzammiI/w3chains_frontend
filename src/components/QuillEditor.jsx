import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styling
import "./QuillEditor.css"; // Import custom styling
// import axios from "axios";
// import "./App.css";

const QuillEditor = () => {
  const [editorContent, setEditorContent] = useState(""); // State to hold editor content

  // Quill.js configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Header options
      ["bold", "italic", "underline", "strike"], // Basic formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["blockquote", "code-block"], // Block quotes and code blocks
      ["link", "image", "video"], // Media
      ["clean"], // Clear formatting
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  // Handle editor content changes
  const handleEditorChange = (content) => {
    setEditorContent(content); // Update the state with new content
  };

  // Save editor content to the server
  // const saveContent = async () => {
  //   try {
  //     // Sending the data to your backend server
  //     const response = await axios.post("http://localhost:5000/api/save", {
  //       content: editorContent,
  //     });
  //     alert("Content saved successfully!");
  //   } catch (error) {
  //     console.error("Error saving content:", error);
  //     alert("Failed to save content. Please try again.");
  //   }
  // };

  return (
    <div className="editor-container">
      <p className="editor-title">Rich Text Editor (Quill.js)</p>
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        placeholder="Write something amazing..."
        className="quill-editor"
      />
      <button className="save-button">
        Save Content
      </button>
    </div>
  );
};

export default QuillEditor;
