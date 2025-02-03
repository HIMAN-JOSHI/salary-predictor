import { useState } from "react";
import JobFetcher from './features/JobFetcher';
import JobDisplay from './features/JobDisplay';



const App = () => {
  const [jobData, setJobData] = useState(null);

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



/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
