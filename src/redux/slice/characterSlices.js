import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllCharacter = createAsyncThunk('fetchAllCharacter', async() => {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character`);
        const data = response.data.results;
        return data;
    } catch (error) {
        console.log("Error", error);
    }
});

export const fetchCharacterById = createAsyncThunk('fetchCharacterById', async(id) => {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.log("Error", error);
    }
});

const characterSlice = createSlice({
    name: 'characterReducer',
    initialState: {
        loading: false,
        data: null,
        error: false,
        currentCharacter: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCharacter.pending, (state, action) => {
            state.loading = true;
            state.data = action.payload;
        });
        builder.addCase(fetchAllCharacter.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAllCharacter.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.error = true;
        });

        builder.addCase(fetchCharacterById.pending, (state, action) => {
            state.loading = true;
            state.currentCharacter = action.payload;
            state.error = null;
        });
        builder.addCase(fetchCharacterById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentCharacter = action.payload;
        });
        builder.addCase(fetchCharacterById.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.error = action.error.message;
        });
    },
})

export default characterSlice.reducer;