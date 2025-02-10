import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import apiSlice from './slices/apiSlice'

export const store = configureStore({
    reducer: {
        counter: dataReducer,
        data: apiSlice,
    },
});

// Типизация для Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;