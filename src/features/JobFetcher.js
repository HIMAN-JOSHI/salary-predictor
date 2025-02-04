import { useState } from "react";
import axios from "axios";
import Logger from 'js-logger';

// Function to fetch job data using the jobPostingId
async function getJobData(jobPostingId) {

  try {
    const payload = {
      operationName: "ApiJobPosting",
      variables: {
        organizationHostedJobsPageName: "cohere",
        jobPostingId: jobPostingId
      },
      query: `query ApiJobPosting($organizationHostedJobsPageName: String!, $jobPostingId: String!) {
        jobPosting(
          organizationHostedJobsPageName: $organizationHostedJobsPageName
          jobPostingId: $jobPostingId
        ) {
          title
          locationName
          workplaceType
          employmentType
          descriptionHtml  
          __typename
        }
      }`
    };

    Logger.info(`Fetching job data for jobPostingId: ${jobPostingId}`);

    const response = await axios.post(
      'https://jobs.ashbyhq.com/api/non-user-graphql?op=ApiJobPosting',
      payload
    );

    const jobPosting = response.data.data.jobPosting;

    if (!jobPosting) {
      Logger.warn("Job posting not found.");
      return null;
    }

    const jobData = {
      title: jobPosting.title,
      locationName: jobPosting.locationName,
      workplaceType: jobPosting.workplaceType,
      employmentType: jobPosting.employmentType,
      descriptionHtml: jobPosting.descriptionHtml
    };

    Logger.info(`Job data fetched successfully: ${JSON.stringify(jobData, null, 2)}`);

    return jobData;

  } catch (error) {
    Logger.error("Error fetching job data:", error);
    if (error.response) {
      Logger.error("Response data:", error.response.data);
      Logger.error("Response status:", error.response.status);
      Logger.error("Response headers:", error.response.headers);
    } else if (error.request) {
      Logger.error("Request error:", error.request);
    } else {
      Logger.error("Error message:", error.message);
    }
    return null;
  }
}



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
                      
            
            const jobIdMatch = parsedUrl.href.match(/\/([^\/]+)$/);
            if (!jobIdMatch || jobIdMatch.length < 2) {
              throw new Error("Invalid URL format, unable to extract jobId");
            }
            

            const jobId = jobIdMatch[1];
            Logger.info("JobId: ", jobId);

            const jobData = await getJobData(jobId);

            onJobDetails(jobData);
        } catch(error) {
            Logger.error("Error occured while getting the job. Please ", error);
            setErrorMessage("Error occured while getting the job. Please ", error);
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