function Results({ student_name, roll_number, comparisons }) {
    // Calculate cumulative marks
    const cumulativeMarks = Object.values(comparisons).reduce(
      (total, result) => total + result.total_score,
      0
    );
  
    const maxTotalMarks = Object.keys(comparisons).length * 10;
    // Calculate percentage
    const percentage = ((cumulativeMarks / maxTotalMarks) * 100).toFixed(2);
  
    return (
      <div className="results-container">
        <h2>Evaluation Results</h2>
        {Object.entries(comparisons).map(([page, result]) => (
          <div key={page} className="page-section">
            <h3>Question {page}</h3>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Student Text</th>
                  <th>Teacher Text</th>
                  <th>Similarity Score</th>
                  <th>Contextual Score</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{result.student_text}</td>
                  <td>{result.teacher_text}</td>
                  <td>
                    <div className="meter-container">
                      <progress
                        className="similarity-meter"
                        max="100"
                        value={result.similarity_score}
                      ></progress>
                      <span>{result.similarity_score.toFixed(2)}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="meter-container">
                      <progress
                        className="contextual-meter"
                        max="100"
                        value={result.contextual_score}
                      ></progress>
                      <span>{result.contextual_score.toFixed(2)}%</span>
                    </div>
                  </td>
                  <td>{result.total_score}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
        
        {/* Enhanced Report Section */}
        <div className="report-section">
          <h1>Student Report</h1>
          <div className="report-card">
            <div className="report-detail">
              <p><strong>Student Name:</strong> {student_name}</p>
              <p><strong>Roll Number:</strong> {roll_number}</p>
              <p>
                <strong>Total Marks:</strong>{" "}
                <span className="highlight">{cumulativeMarks} / {maxTotalMarks}</span>
              </p>
              <p>
                <strong>Total Percentage:</strong>{" "}
                <span className="highlight">{percentage}%</span>
              </p>
            </div>
            <div className="percentage-meter">
              <h4>Overall Performance</h4>
              <div className="meter-container">
                <progress
                  className="percentage-progress"
                  max="100"
                  value={percentage}
                ></progress>
                <span className="percentage-text">{percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Results;