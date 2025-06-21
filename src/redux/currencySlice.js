import { createSlice } from '@reduxjs/toolkit';
import {
  fetchActualRates,
  fetchBaseCurrency,
  fetchExchangeCurrency,
} from './operations';

const slice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
    rates: [],
  },
  reducers: {
    setBaseCurrency(state, action) {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchBaseCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchBaseCurrency.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchExchangeCurrency.pending, state => {
        state.exchangeInfo = null;
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchExchangeCurrency.fulfilled, (state, action) => {
        state.exchangeInfo = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchExchangeCurrency.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchActualRates.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchActualRates.fulfilled, (state, action) => {
        state.rates = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchActualRates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      }),
});

export const { setBaseCurrency } = slice.actions;
export const currencyReducer = slice.reducer;
