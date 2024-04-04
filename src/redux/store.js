import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import characterReducer from './slice/characterSlices';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, characterReducer);

export const store = configureStore({
    reducer: {
        character: characterReducer,
        persistor: persistedReducer,
    }
})

export const persistor = persistStore(store);