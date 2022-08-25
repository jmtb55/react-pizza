import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callLoginEndpoint } from './api';

export const login = createAsyncThunk(
    'auth/login',
    async (loginData, {dispatch}) => {
        dispatch(loginAsyncBegin());
        const response = await (await callLoginEndpoint(loginData)).json();
        dispatch(loginAsyncCompleted(response));
        return response;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        session: false,
        loading: false,
        error: false,
    },
    reducers: {
        logout: (state) => {
            state.session = null;
            state.loading = false;
            state.error = false;
        },
        loginAsyncCompleted: (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.session = null;
                state.error = action.payload.error;
            } else {
                state.session = action.payload
                state.error = null;
            }
        },
        loginAsyncBegin: (state) => {
            state.loading = true;
        }
    },
})

export const { logout, loginAsyncCompleted, loginAsyncBegin } = authSlice.actions;

export default authSlice.reducer;