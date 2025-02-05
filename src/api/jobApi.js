import axiosInstance from './axiosInstance';

// Function to fetch job data using job ID
export const fetchJobDataFromApi = async (jobId) => {
  const payload = {
    operationName: "ApiJobPosting",
    variables: {
      organizationHostedJobsPageName: "cohere",
      jobPostingId: jobId,
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
      }
    }`
  };

  try {
    const response = await axiosInstance.post('/non-user-graphql?op=ApiJobPosting', payload);
    return response.data.data.jobPosting;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch job data');
  }
};
