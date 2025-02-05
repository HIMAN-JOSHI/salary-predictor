import React from 'react';

const JobInfo = ({ location, employmentType }) => {
  return (
    <div>
      <p style={styles.info}><strong>Location:</strong> {location || "Remote"}</p>
      <p style={styles.info}><strong>Employment Type:</strong> {employmentType || "Not specified"}</p>
    </div>
  );
};

const styles = {
  info: { fontSize: "16px", color: "#555", margin: "5px 0" }
};

export default JobInfo;
