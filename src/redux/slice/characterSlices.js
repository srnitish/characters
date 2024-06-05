import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllCharacter = createAsyncThunk('fetchAllCharacter', async() => {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data from the API');
        }
        const data = response.data.results;
        return data;
    } catch (error) {
        console.log("Error Message is:", error.message);
        throw new Error(`Failed to connect to the API, ${error.message}`); // Handle errors when the API URL is incorrect
    }
});

export const fetchCharacterById = createAsyncThunk('fetchCharacterById', async(id) => {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data from the API');
        }
        const data = response.data;
        return data;
    } catch (error) {
        console.log("Error", error);
        throw new Error(`Failed to connect to the API, ${error.message}`); // Handle errors when the API URL is incorrect
    }
});


const characterSlice = createSlice({
    name: 'characters',
    initialState: {
        loading: false,
        data: null,
        status: 'idle',
        error: false,
        currentCharacter: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllCharacter.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllCharacter.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAllCharacter.rejected, (state, action) => {
            state.loading = false;
            console.log("Error Message Getting From Slice.js in Rejected State:", action.error.message);
            state.error = action.error.message;
        });

        // CharacterByID
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
            state.loading = false;
            console.log("Error", action.payload);
            state.error = action.payload;
        });
    }
})

export default characterSlice.reducer;