import React, { useState } from "react";
import TeacherUpload from "./components/TeacherUpload";
import StudentUpload from "./components/StudentUpload";
import Results from "./components/Results";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [isTeacherUploaded, setIsTeacherUploaded] = useState(false);
  const [comparisons, setComparisons] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading overlay
  const [student_name, setStudentName] = useState(""); // State for student name
  const [roll_number, setRollNumber] = useState(""); // State for roll number

  return (
    <div className="app">
      {/* Header */}
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="header-title">📝 Answer Sheet Evaluation System</h1>
        <p className="header-subtitle">Effortlessly evaluate exam papers with accuracy.</p>
      </motion.header>

      {/* Loading Overlay */}
      {loading && (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Processing... Please wait.</p>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Teacher Upload Section */}
        {!isTeacherUploaded ? (
          <div className="upload-section">
            <TeacherUpload setIsTeacherUploaded={setIsTeacherUploaded} setLoading={setLoading} />
          </div>
        ) : (
          <>
            {/* Student Upload Section */}
            <motion.div
              className="upload-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <StudentUpload
                setComparisons={setComparisons}
                setLoading={setLoading}
                setStudentName={setStudentName} // Pass setter for student name
                setRollNumber={setRollNumber} // Pass setter for roll number
              />
            </motion.div>

            {/* Results Section */}
            {comparisons && (
              <motion.div
                className="results-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Results
                  comparisons={comparisons}
                  studentName={student_name} // Pass student name
                  rollNumber={roll_number} // Pass roll number
                />
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default App;