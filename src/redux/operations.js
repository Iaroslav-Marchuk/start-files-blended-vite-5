import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../service/opencagedataApi';
import { exchangeCurrency, latestRates } from '../service/exchangeAPI';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) return baseCurrency;
    try {
      const data = await getUserInfo(coords);
      console.log(data);
      return data.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeCurrency = createAsyncThunk(
  'currency/fetchExchangeCurrency',
  async (currencyData, thunkAPI) => {
    try {
      const data = await exchangeCurrency(currencyData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchActualRates = createAsyncThunk(
  'currency/fetchActualRates',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const baseCurrency = state.currency.baseCurrency;

      if (!baseCurrency) {
        return thunkAPI.rejectWithValue('Base currency is not set');
      }

      const data = await latestRates(baseCurrency);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
