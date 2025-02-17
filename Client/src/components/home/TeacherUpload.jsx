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
    <div className="space-y-6 max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">Upload Answer Key</h2>
      
      {/* File input container */}
      <div className="flex justify-center">
        <label className="w-full">
          <div className="flex flex-col items-center justify-center py-8 px-6 border-2 border-dashed border-indigo-400 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer bg-white">
            <div className="space-y-2 text-center">
              <p className="text-lg font-medium text-gray-700">
                Upload Answer Key (PDF only)
              </p>
              <p className="text-sm text-gray-500">File size up to 5MB</p>
            </div>
          </div>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Overlay during upload */}
      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center animate__animated animate__fadeIn animate__faster">
            <h2 className="text-2xl font-semibold text-gray-800">Uploading...</h2>
            <p className="text-lg text-gray-600">Please wait while we process your file.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherUpload;
