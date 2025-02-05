import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobData } from './store/jobSlice';
import { fetchSalaryPrediction } from './store/salarySlice';
import JobDisplay from './features/JobDisplay';

const App = () => {
  const [jobUrl, setJobUrl] = useState("");
  const dispatch = useDispatch();

  const jobData = useSelector((state) => state.job.data);
  const jobLoading = useSelector((state) => state.job.loading);
  const jobError = useSelector((state) => state.job.error);

  const salaryPrediction = useSelector((state) => state.salary.prediction);
  const salaryLoading = useSelector((state) => state.salary.loading);

  const handleJobFetch = () => {
    dispatch(fetchJobData(jobUrl));
  };

  const handleGetSalary = () => {
    if (!jobData) return;

    const prompt = `
      Given the job information:
      Title: ${jobData.title}
      Location: ${jobData.locationName}
      Employment Type: ${jobData.employmentType}
      Workplace Type: ${jobData.workplaceType}
      Description: ${jobData.descriptionHtml}
      Predict the expected salary for this job position in USD.
    `;

    dispatch(fetchSalaryPrediction(prompt));
  };

  return (
    <div style={styles.container}>
      <h1>Job Salary Predictor</h1>

      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Enter Job URL"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleJobFetch} style={styles.fetchButton}>
          {jobLoading ? "Fetching..." : "Fetch Job"}
        </button>
      </div>

      {jobError && <p style={styles.error}>{jobError}</p>}

      <JobDisplay 
        jobData={jobData} 
        salaryPrediction={salaryPrediction} 
        onGetSalary={handleGetSalary} 
        isLoading={salaryLoading}
      />
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" },
  formContainer: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: "1", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  fetchButton: { padding: "10px 15px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "#e74c3c", marginTop: "10px" }
};

export default App;
