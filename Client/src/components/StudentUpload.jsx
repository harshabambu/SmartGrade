import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./StudentUpload.css";

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
    <div className="student-upload">
      <h1>Upload Student Answer Sheet</h1>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label>Student Name:</label>
          <input type="text" name="studentName" required />
        </div>
        <div className="form-group">
          <label>Roll Number:</label>
          <input type="text" name="rollNumber" required />
        </div>
        <div className="form-group">
          <label>Upload PDF:</label>
          <input type="file" name="pdf" accept=".pdf" required />
        </div>
        <button type="submit">Upload</button>
      </form>

      {loading && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Uploading...</h2>
            <p>Please wait while we process your file.</p>
          </div>
        </div>
      )}

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