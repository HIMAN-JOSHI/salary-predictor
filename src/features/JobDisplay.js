import React from 'react';
import JobTitle from '../components/jobTitle';
import JobInfo from '../components/JobInfo';
import JobDescription from '../components/JobDescription';
import SalaryPrediction from '../components/SalaryPrediction';

const JobDisplay = ({ jobData, salaryPrediction, onGetSalary, isLoading }) => {
  if (!jobData) {
    return <p style={styles.message}>Enter a valid job URL to fetch details.</p>;
  }

  const { title, locationName, employmentType, descriptionHtml } = jobData;

  return (
    <div style={styles.container}>
      <JobTitle title={title} />
      <JobInfo location={locationName} employmentType={employmentType} />
      <JobDescription descriptionHtml={descriptionHtml} />

      {/* Predict Salary Button */}
      <button 
        style={styles.button} 
        onClick={onGetSalary} 
        disabled={isLoading}
      >
        {isLoading ? "Predicting Salary..." : "Get Salary"}
      </button>

      <SalaryPrediction salaryPrediction={salaryPrediction} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff"
  },
  message: { textAlign: "center", color: "#888", fontSize: "16px" },
  button: {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default JobDisplay;
