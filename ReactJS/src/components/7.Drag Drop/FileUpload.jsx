import React, { useState } from 'react';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Save selected file to state
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Read file only when clicking Submit
  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      setContent(event.target.result);
    };

    reader.readAsText(selectedFile);
  };

function onHover(e){
  e.preventDefault();
  setIsDragging(true);
}

function onLeave(e){
  e.preventDefault();
  setIsDragging(false);
}
function onDrop(e){
  e.preventDefault();
  setIsDragging(false);

  const file=e.dataTransfer.files[0];
  setSelectedFile(file);
}


  return (
    <div>
      <div style={{marginBottom:"10px",border:"2px dashed black",padding:"10px"}}
      onDragOver={onHover}
      onDragLeave={onLeave}
      onDrop={onDrop}
      >

      <h1>Upload File</h1>

      <input type="file" onChange={handleFileSelect} />
      </div>
      <button onClick={handleSubmit}>Submit</button>

      <div style={{ border: "2px solid black", marginTop: "20px", padding: "10px" }}>
        <h3>File Content:</h3>
        <h1>{content}</h1>
      </div>
    </div>
  );
}

export default FileUpload;
