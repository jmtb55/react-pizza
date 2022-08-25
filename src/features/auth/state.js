import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callLoginEndpoint } from './api';

const SESSION_KEY = 'session';

export const login = createAsyncThunk(
    'auth/login',
    async (loginData, {dispatch}) => {
        dispatch(loginAsyncBegin());
        const response = await (await callLoginEndpoint(loginData)).json();
        dispatch(loginAsyncCompleted(response));
        return response;
    }
);

let localStorageSession = localStorage.getItem(SESSION_KEY);
localStorageSession = localStorageSession && localStorageSession !== 'undefined' ? JSON.parse(localStorageSession) : null;

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        session: localStorageSession,
        loaded: false,
        loading: false,
        error: false,
    },
    reducers: {
        logout: (state) => {
            state.session = null;
            state.loaded = false;
            state.loading = false;
            state.error = false;
            localStorage.removeItem(SESSION_KEY);
        },
        loginAsyncCompleted: (state, action) => {
            state.loading = false;
            console.log(action.payload)
            if (action.payload.error) {
                state.session = null;
            } else {
                state.session = action.payload
            }
        },
        loginAsyncBegin: (state) => {
            state.loading = true;
        }
    },
})

export const { logout, loginAsyncCompleted, loginAsyncBegin } = authSlice.actions;

export default authSlice.reducer;