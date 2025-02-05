const axios = require('axios');
const { fetchJobDataFromApi } = require('../jobApi');

// Mock Axios
jest.mock('axios');

describe('Job API', () => {
  it('should fetch job data successfully', async () => {
    const mockJobId = '12345';
    const mockResponse = {
      data: {
        data: {
          jobPosting: {
            title: 'Software Engineer',
            locationName: 'Remote',
            workplaceType: 'Remote',
            employmentType: 'Full-time',
            descriptionHtml: '<p>Job description here</p>',
          }
        }
      }
    };

    // Mock the API response
    axios.post.mockResolvedValue(mockResponse);

    const jobData = await fetchJobDataFromApi(mockJobId);

    // Assertions
    expect(jobData.title).toBe('Software Engineer');
    expect(jobData.locationName).toBe('Remote');
    expect(jobData.employmentType).toBe('Full-time');
    expect(jobData.descriptionHtml).toBe('<p>Job description here</p>');
  });

  it('should throw an error when API fails', async () => {
    axios.post.mockRejectedValue(new Error('API Error'));

    await expect(fetchJobDataFromApi('12345')).rejects.toThrow('Failed to fetch job data');
  });
});
