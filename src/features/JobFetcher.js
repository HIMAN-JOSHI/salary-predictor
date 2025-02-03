import { useState } from "react";
import axios from "axios";

const JobSearchForm = ({onJobDetails }) => {
    const [jobUrl, setJobUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleJobFetch = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try{
            
            const parsedUrl = new URL(jobUrl);

            // Note- It is assumed that the jobs will be processed from the domain specified in the problem statement.
            // i.e. - jobs.ashbyhq.com

            // Check the domain
            if(!parsedUrl.hostname.includes("jobs.ashbyhq.com")) {
                throw new Error("Invalid domain. Please enter a valid job URL");
            }

            // TODO : Add one more check here for pattern matching.

            const { data } = await axios.get(jobUrl);
            onJobDetails(data);
        } catch{
            setErrorMessage("Error occured while getting the job. Please ");
            onJobDetails(null);

        }
    };

    return (

        <form onSubmit={handleJobFetch} style={styles.form}>
            <label htmlFor="jobUrl" style={styles.label}>Enter Job URL:</label>
            <input 
            type="text"
            id="jobUrl"
            placeholder="https://jobs.ashbyhq.com/cohere/dc7da5f5-a571-42c3-80e8-b2c5ffbf3e8a"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            style={styles.input}
            />
            <button type="submit" style={styles.button}>Get Job</button>

            {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}
           
        </form>

    )
};

const styles = {
    form: { display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", marginBottom: "25px" },
    label: { fontSize: "14px", color: "#333" },
    input: { width: "320px", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" },
    button: { padding: "10px 15px", borderRadius: "6px", border: "none", background: "#28a745", color: "#fff", cursor: "pointer" },
    error: { color: "#e74c3c", marginTop: "10px" }
  };

export default JobSearchForm;