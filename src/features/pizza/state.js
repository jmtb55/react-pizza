import { createSlice } from '@reduxjs/toolkit';

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        loaded: false,
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {

    }
});

export default pizzaSlice.reducer;