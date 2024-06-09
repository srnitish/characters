import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPost = createAsyncThunk('fetchPost', async(page = 1) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data from the API');
        }
        // return response.data;
        return { data: response.data, page };
    } catch (error) {
        console.log("Error Message is:", error.message);
        throw new Error(`Failed to connect to the API, ${error.message}`);
    }
});

const postSlice = createSlice({
    name: 'post',
    initialState: {
        loading: false,
        data: [],
        state: 'idle',
        error: null,
        page: 1,
        hasMore: true, // Indicator to check if more data is available
    },
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.data.length === 0) {
                state.hasMore = false;
            } else {
                // Ensure no duplication
                const newData = action.payload.data.filter(
                    (item) => !state.data.some((existingItem) => existingItem.id === item.id)
                );
                state.data = [...state.data, ...newData];
            }
        });
        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { setPage } = postSlice.actions;
export default postSlice.reducer;