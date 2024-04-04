import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slice/characterSlices';

export const store = configureStore({
    reducer: {
        character: characterReducer,
    }
})