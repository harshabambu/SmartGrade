import React, { useState } from "react";
import TeacherUpload from "./TeacherUpload";
import StudentUpload from "./StudentUpload";
import Results from "./Results";
import { motion } from "framer-motion";
import InfoCard from "./InfoCard";
import { 
  Brain, 
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Settings,
  X
} from 'lucide-react';

function Home() {
  const [file, setFile] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const [isTeacherUploaded, setIsTeacherUploaded] = useState(false);
  const [comparisons, setComparisons] = useState(null);
  const [loading, setLoading] = useState(false);
  const [student_name, setStudentName] = useState("");
  const [roll_number, setRollNumber] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      // Simulating file upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!isTeacherUploaded) {
        setIsTeacherUploaded(true);
        setFile(null);
      } else {
        setComparisons({
          total_questions: 10,
          correct_answers: 7,
          score_percentage: 70
        });
      }
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center space-x-4">
            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
            <p className="text-gray-700">Processing your file...</p>
          </div>
        </div>
      )}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isTeacherUploaded ? 'Upload Student Answer Sheet' : 'Upload Answer Key'}
            </h1>
            <p className="text-gray-600">
              {isTeacherUploaded 
                ? 'Upload the student\'s answer sheet for evaluation' 
                : 'Configure the model answer sheet for accurate evaluation'}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="md:col-span-2">
              {isTeacherUploaded && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student Name
                      </label>
                      <input
                        type="text"
                        value={student_name}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter student's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        value={roll_number}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter roll number"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {isTeacherUploaded ? 'Student Answer Sheet' : 'Answer Key Upload'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {isTeacherUploaded 
                      ? 'Upload the completed answer sheet for evaluation'
                      : 'Upload your answer key in PDF or image format'}
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {!file ? (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <label className="block">
                        <span className="bg-indigo-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
                          Select File
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        Drag and drop or click to upload
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-6 h-6 text-indigo-600 mr-2" />
                        <span className="text-gray-700">{file.name}</span>
                      </div>
                      <button 
                        onClick={() => setFile(null)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Configuration Section */}
              {!isTeacherUploaded && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Answer Key Configuration</h2>
                    <p className="text-gray-600 text-sm">Define scoring criteria and evaluation parameters</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Questions
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter total number of questions"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Points per Question
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter points per question"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Results Section */}
              {comparisons && (
                <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Evaluation Results</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Total Questions</p>
                      <p className="text-2xl font-bold text-gray-900">{comparisons.total_questions}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Correct Answers</p>
                      <p className="text-2xl font-bold text-green-600">{comparisons.correct_answers}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Score Percentage</p>
                      <p className="text-2xl font-bold text-indigo-600">{comparisons.score_percentage}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Guidelines</h3>
                
                <div className="space-y-4">
                  <InfoCard
                    icon={<FileText className="w-5 h-5 text-indigo-600" />}
                    title="Supported Formats"
                    description="PDF, JPG, JPEG, PNG files up to 10MB"
                  />
                  
                  <InfoCard
                    icon={<Settings className="w-5 h-5 text-indigo-600" />}
                    title="Configuration"
                    description="Set question count, scoring, and evaluation criteria"
                  />
                  
                  <InfoCard
                    icon={<AlertCircle className="w-5 h-5 text-indigo-600" />}
                    title="Important Note"
                    description="Ensure answer key is clear and properly formatted"
                  />
                </div>

                <div className="mt-6">
                  <button 
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    onClick={() => setShowTip(!showTip)}
                  >
                    <HelpCircle className="w-5 h-5 inline-block mr-2" />
                    Need Help?
                  </button>
                </div>

                {showTip && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-900 mb-2">Pro Tip</h4>
                    <p className="text-sm text-indigo-700">
                      For best results, ensure your answer key is well-structured and clearly indicates correct answers. Consider using our template for optimal recognition.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button 
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => {
                setFile(null);
                if (isTeacherUploaded) {
                  setIsTeacherUploaded(false);
                  setComparisons(null);
                  setStudentName("");
                  setRollNumber("");
                }
              }}
            >
              {isTeacherUploaded ? 'Start Over' : 'Cancel'}
            </button>
            <button 
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleSubmit}
              disabled={!file || (isTeacherUploaded && (!student_name || !roll_number))}
            >
              {isTeacherUploaded ? 'Evaluate' : 'Save and Continue'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


export default Home;
