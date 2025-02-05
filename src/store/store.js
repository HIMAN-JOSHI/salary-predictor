import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './jobSlice';
import salaryReducer from './salarySlice';

const store = configureStore({
  reducer: {
    job: jobReducer,
    salary: salaryReducer,
  },
});

export default store;
