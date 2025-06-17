import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency } from './operations';

const slice = createSlice({
  name: 'currency',
  initialState: { baseCurrency: '', isLoading: false, error: null },
  reducers: {
    setBaseCurrency(state, action) {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchBaseCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(fetchBaseCurrency.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      }),
});

export const { setBaseCurrency } = slice.actions;
export const currencyReducer = slice.reducer;
