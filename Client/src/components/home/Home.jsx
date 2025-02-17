import React, { useState } from "react";
import TeacherUpload from "./TeacherUpload";
import StudentUpload from "./StudentUpload";
import Results from "./Results";
import { motion } from "framer-motion";

function Home() {
  const [isTeacherUploaded, setIsTeacherUploaded] = useState(false);
  const [comparisons, setComparisons] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading overlay
  const [student_name, setStudentName] = useState(""); // State for student name
  const [roll_number, setRollNumber] = useState(""); // State for roll number
  

  /**
   * Main Home component
   * @returns {JSX.Element} The rendered Home component
   */
  return (
    <div className="font-roboto text-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-5 box-border">
      {/* Header */}
      <motion.header
        className="mb-5"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-gray-800 font-bold m-0">📝 Answer Sheet Evaluation System</h1>
        <p className="text-xl text-gray-600 mt-2">Effortlessly evaluate exam papers with accuracy.</p>
      </motion.header>

      {/* Loading Overlay */}
      {loading && (
        <motion.div
          className="fixed inset-0 bg-opacity-50 bg-gray-800 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center text-white p-5">
            <div className="animate-spin border-t-4 border-white rounded-full w-12 h-12 mx-auto mb-3"></div>
            <p>Processing... Please wait.</p>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        className="max-w-full mx-auto bg-white rounded-xl shadow-md p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Teacher Upload Section */}
        {!isTeacherUploaded ? (
          <div className="border-2 border-dashed border-blue-200 p-5 rounded-xl mb-5 hover:bg-blue-50 hover:border-blue-300 transition">
            <TeacherUpload setIsTeacherUploaded={setIsTeacherUploaded} setLoading={setLoading} />
          </div>
        ) : (
          <>
            {/* Student Upload Section */}
            <motion.div
              className="border-2 border-dashed border-blue-200 p-5 rounded-xl mb-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <StudentUpload
                setComparisons={setComparisons}
                setLoading={setLoading}
                setStudentName={setStudentName}
                setRollNumber={setRollNumber}
              />
            </motion.div>

            {/* Results Section */}
            {comparisons && (
              <motion.div
                className="mt-5 p-5 bg-gray-50 rounded-xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Results
                  comparisons={comparisons}
                  studentName={student_name}
                  rollNumber={roll_number}
                />
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Home;
