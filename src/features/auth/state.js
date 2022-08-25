import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callLoginEndpoint } from './api';

const SESSION_KEY = 'session';

export const login = createAsyncThunk(
    'auth/login',
    async (loginData) => {
      const response = await callLoginEndpoint(loginData)
      return response.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        session: JSON.parse(localStorage.getItem(SESSION_KEY)),
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
            console.log('login successful: ', action.payload);
            state.session = action.payload;
            localStorage.setItem(SESSION_KEY, JSON.stringify(action.payload));
            state.loaded = true;
            state.loading = false;
            state.error = false;
        }).addCase(login.pending, (state, action) => {
            console.log('login pending: ', action.payload);
            state.loading = true;
        }).addCase(login.rejected, (state, action) => {
            console.log('login rejected: ', action.payload);
            state.loading = false;
            state.error = action.payload.error;
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;