import { useState } from "react";
import JobFetcher from './features/JobFetcher';
import JobDisplay from './features/JobDisplay';
import Logger from 'js-logger';

const App = () => {
  const [jobData, setJobData] = useState(null);
  Logger.useDefaults();
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Job Details Viewer</h1>
      <JobFetcher onJobDetails={setJobData} />
      <JobDisplay jobData={jobData} />
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { fontSize: "24px", marginBottom: "20px", color: "#333" },
};

export default App;
