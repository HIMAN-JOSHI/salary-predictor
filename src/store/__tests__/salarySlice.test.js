import salaryReducer, { fetchSalaryPrediction, updateSalaryPrediction, clearSalaryPrediction } from '../salarySlice';
import { predictSalary } from '../../api/salaryApi';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../../api/salaryApi');

describe('Salary Slice', () => {
  it('should handle initial state', () => {
    const initialState = { prediction: '', loading: false };
    expect(salaryReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle updateSalaryPrediction', () => {
    const initialState = { prediction: '', loading: false };
    const state = salaryReducer(initialState, updateSalaryPrediction('$50,000 - $60,000'));
    expect(state.prediction).toBe('$50,000 - $60,000');
  });

  it('should handle clearSalaryPrediction', () => {
    const initialState = { prediction: '$50,000 - $60,000', loading: false };
    const state = salaryReducer(initialState, clearSalaryPrediction());
    expect(state.prediction).toBe('');
  });

  it('should handle fetchSalaryPrediction thunk', async () => {
    predictSalary.mockImplementation(async (prompt, onChunk) => {
      onChunk('$70,000 - $80,000');
    });

    const store = configureStore({ reducer: { salary: salaryReducer } });
    await store.dispatch(fetchSalaryPrediction("Test prompt"));

    const state = store.getState().salary;
    expect(state.prediction).toBe('$70,000 - $80,000');
    expect(state.loading).toBe(false);
  });
});
