import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TradingData } from '../../types';

interface DataState {
    data: TradingData | null;
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: DataState = {
    data: null,
    status: "idle",
};

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async () => {
        const response = await fetch('/api/data.min.json');
        const data = await response.json();
        return data;
    }
);

const apiSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchData.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export default apiSlice.reducer;