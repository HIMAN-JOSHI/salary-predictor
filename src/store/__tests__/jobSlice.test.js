const jobReducer = require('../jobSlice').default;
const { fetchJobData } = require('../jobSlice');
const { configureStore } = require('@reduxjs/toolkit');
const { fetchJobDataFromApi } = require('../../api/jobApi');

jest.mock('../../api/jobApi');

describe('Job Slice', () => {
  it('should handle initial state', () => {
    const initialState = { data: null, loading: false, error: null };
    expect(jobReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchJobData pending', () => {
    const state = jobReducer(undefined, fetchJobData.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchJobData fulfilled', () => {
    const jobData = { title: 'Software Engineer', locationName: 'Remote' };
    const state = jobReducer(undefined, fetchJobData.fulfilled(jobData));
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(jobData);
  });

  it('should handle fetchJobData rejected', () => {
    const error = 'API Error';
    const state = jobReducer(undefined, fetchJobData.rejected(null, { payload: error }));
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should dispatch fetchJobData thunk and update state', async () => {
    const mockJobData = { title: 'Frontend Developer', locationName: 'Remote' };
    fetchJobDataFromApi.mockResolvedValue(mockJobData);

    const store = configureStore({ reducer: { job: jobReducer } });
    await store.dispatch(fetchJobData('https://jobs.ashbyhq.com/cohere/12345'));

    const state = store.getState().job;
    expect(state.data).toEqual(mockJobData);
    expect(state.loading).toBe(false);
  });
});
