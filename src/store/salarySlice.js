import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { predictSalary } from '../api/salaryApi';

// Async thunk for streaming salary prediction
export const fetchSalaryPrediction = createAsyncThunk(
  'salary/fetchSalaryPrediction',
  async (prompt, { dispatch }) => {
    return new Promise(async (resolve) => {
      await predictSalary(prompt, (chunk) => {
        dispatch(updateSalaryPrediction(chunk));  // Update prediction with each chunk
      });
      resolve();
    });
  }
);

// Salary slice
const salarySlice = createSlice({
  name: 'salary',
  initialState: {
    prediction: "",
    loading: false,
  },
  reducers: {
    updateSalaryPrediction: (state, action) => {
      state.prediction += action.payload;
    },
    clearSalaryPrediction: (state) => {
      state.prediction = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalaryPrediction.pending, (state) => {
        state.loading = true;
        state.prediction = "";
      })
      .addCase(fetchSalaryPrediction.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { updateSalaryPrediction, clearSalaryPrediction } = salarySlice.actions;

export default salarySlice.reducer;
