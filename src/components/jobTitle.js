import React from 'react';

const JobTitle = ({ title }) => {
  return <h2 style={styles.title}>{title}</h2>;
};

const styles = {
  title: { fontSize: "24px", marginBottom: "10px", color: "#333" }
};

export default JobTitle;
