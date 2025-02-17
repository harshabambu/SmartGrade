import React, { useState } from "react";
import axios from "axios";
import "./TeacherUpload.css"; // Add a CSS file for overlay styles

function TeacherUpload({ setIsTeacherUploaded }) {
  const [uploading, setUploading] = useState(false); // State for overlay

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    // Validation for file type and size
    if (!file) {
      alert("Please select a file!");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5 MB!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    setUploading(true); // Show overlay
    try {
      const response = await axios.post("http://localhost:5000/upload/teacher", formData);
      console.log(response);
      alert("KEY uploaded successfully!");
      setIsTeacherUploaded(true);
    } catch (error) {
      console.error(error);
      alert("Error uploading KEY. Please try again.");
    } finally {
      setUploading(false); // Hide overlay
    }
  };

  return (
    <div>
      <h2>Upload Answer Key</h2>
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      {/* Overlay */}
      {uploading && (
        <div className="overlay">
          <div className="overlay-content">
            <p>Uploading... Please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherUpload;