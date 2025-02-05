
const JobDisplay = ({ jobData, salaryPrediction }) => {
  
    if (!jobData) return <p style={styles.message}>Enter a valid job URL to fetch details.</p>;
  
    const { title, location, employmentType, descriptionHtml } = jobData;
  
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.info}><strong>Location:</strong> {location || "Remote"}</p>
        <p style={styles.info}><strong>Employment Type:</strong> {employmentType || "Not specified"}</p>
        
        <div style={styles.description}>
            
          {descriptionHtml ? (
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            ) : (
              <p>No description available.</p>
            )}

        </div>

        <div style={styles.salaryStream}>
          <h3>Salary Prediction</h3>
          <p>{salaryPrediction || "Loading salary prediction..."}</p>

        </div>

      </div>
    );
  };
  
  const styles = {
    container: { maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" },
    title: { fontSize: "24px", marginBottom: "10px", color: "#333" },
    info: { fontSize: "16px", color: "#555", margin: "5px 0" },
    description: { marginTop: "15px", lineHeight: "1.6", color: "#444" },
    applyButton: { display: "block", marginTop: "20px", padding: "10px", backgroundColor: "#007bff", color: "#fff", textAlign: "center", textDecoration: "none", borderRadius: "5px" },
    message: { textAlign: "center", color: "#888", fontSize: "16px" },
    salaryStream: {
      marginTop: "20px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
      maxHeight: "200px",    // Set a maximum height for the display area
      overflowY: "auto",     // Enable vertical scrolling when content overflows
      whiteSpace: "pre-wrap" // Preserve line breaks and wrap text as needed
    }
  
  };
  
  export default JobDisplay;
  