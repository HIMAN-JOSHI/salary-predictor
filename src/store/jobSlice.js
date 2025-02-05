import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJobDataFromApi } from '../api/jobApi';

// Async thunk for fetching job data
export const fetchJobData = createAsyncThunk(
  'job/fetchJobData',
  async (jobUrl, thunkAPI) => {
    try {
      const parsedUrl = new URL(jobUrl);

      if (!parsedUrl.hostname.includes("jobs.ashbyhq.com")) {
        throw new Error("Invalid domain. Please enter a valid job URL.");
      }

      const jobIdMatch = parsedUrl.href.match(/\/([^\/]+)$/);
      if (!jobIdMatch || jobIdMatch.length < 2) {
        throw new Error("Invalid URL format, unable to extract jobId.");
      }

      const jobId = jobIdMatch[1];
      return await fetchJobDataFromApi(jobId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Job slice
const jobSlice = createSlice({
  name: 'job',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJobData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
