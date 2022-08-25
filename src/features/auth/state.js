import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callLoginEndpoint } from './api';

const SESSION_KEY = 'session';

export const login = createAsyncThunk(
    'auth/login',
    async (loginData) => {
      const response = callLoginEndpoint(loginData)
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            console.log('login successful: ', action);
            state.session = action.payload;
            localStorage.setItem(SESSION_KEY, JSON.stringify(action.payload));
            state.loaded = true;
            state.loading = false;
            state.error = false;
        }).addCase(login.pending, (state, action) => {
            console.log('login pending: ', action);
            state.loading = true;
        }).addCase(login.rejected, (state, action) => {
            console.log('login rejected: ', action);
            state.loading = false;
            state.error = action.payload.error;
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;