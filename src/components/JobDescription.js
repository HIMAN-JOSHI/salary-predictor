import React from 'react';

const JobDescription = ({ descriptionHtml }) => {
  return (
    <div style={styles.description}>
      {descriptionHtml ? (
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      ) : (
        <p>No description available.</p>
      )}
    </div>
  );
};

const styles = {
  description: { marginTop: "15px", lineHeight: "1.6", color: "#444" }
};

export default JobDescription;
