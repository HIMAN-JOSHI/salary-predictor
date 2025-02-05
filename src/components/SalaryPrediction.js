import React from 'react';

const SalaryPrediction = ({ salaryPrediction }) => {
  return (
    <div style={styles.salaryStream}>
      <h3>Salary Prediction</h3>
      <p>{salaryPrediction || "Loading salary prediction..."}</p>
    </div>
  );
};

const styles = {
  salaryStream: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    maxHeight: "200px",
    overflowY: "auto",
    whiteSpace: "pre-wrap"
  }
};

export default SalaryPrediction;
