import React, { useState } from "react";
import axios from "axios";

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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Upload Answer Key</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        className="file:mr-3 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:hover:bg-blue-700"
      />
      
      {/* Overlay */}
      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center animate__animated animate__fadeIn animate__faster">
            <p className="text-lg text-gray-700">Uploading... Please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherUpload;
