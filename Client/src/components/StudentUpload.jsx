import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";

function StudentUpload() {
  const [comparisons, setComparisons] = useState({});
  const [studentDetails, setStudentDetails] = useState({
    student_name: "",
    roll_number: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false); // State for overlay effect

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    setLoading(true); // Show overlay

    try {
      const response = await axios.post(
        "http://localhost:5000/upload/student_api",
        formData
      );
      setComparisons(response.data.comparisons);
      setStudentDetails({
        student_name: response.data.student_name,
        roll_number: response.data.roll_number,
      });
      setShowResults(true);
      alert("Student details and answer sheet uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading student details. Please try again.");
    } finally {
      setLoading(false); // Hide overlay
    }
  };

  return (
    <div className="p-5 space-y-6 font-sans">
      <h1 className="text-3xl font-semibold text-gray-800">Upload Student Answer Sheet</h1>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="space-y-1">
          <label className="block font-semibold text-gray-700">Student Name:</label>
          <input
            type="text"
            name="studentName"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-1">
          <label className="block font-semibold text-gray-700">Roll Number:</label>
          <input
            type="text"
            name="rollNumber"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-semibold text-gray-700">Upload PDF:</label>
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center animate__animated animate__fadeIn animate__faster">
            <h2 className="text-2xl font-semibold text-gray-800">Uploading...</h2>
            <p className="text-lg text-gray-600">Please wait while we process your file.</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {showResults && (
        <Results
          student_name={studentDetails.student_name}
          roll_number={studentDetails.roll_number}
          comparisons={comparisons}
        />
      )}
    </div>
  );
}

export default StudentUpload;
