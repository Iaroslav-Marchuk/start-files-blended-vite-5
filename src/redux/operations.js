import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../service/opencagedataApi';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (coords, thunkAPI) => {
    try {
      const currencyCode = await getUserInfo(coords);
      return currencyCode;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
