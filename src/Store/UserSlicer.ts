import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export interface userCredentials {
    username: string;
    password: string; // Adjust the type according to your token type
}

interface UserState {
    loading: boolean;
    user: any; // Change `any` to the actual type of your user object
    error: any; // Change `any` to the actual type of your error object
}

const initialState: UserState = {
    loading: false,
    user: null,
    error: null,
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials: userCredentials) => {
        const response = await axios.post(`${apiUrl}/users/login`, userCredentials);
        return response.data;
    }
);



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<any>) {
            state.error = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending,(state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state,action) =>{
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with  status code 401'){
                state.error = 'Access denied! Invalid credentials';
            }
            else{
                state.error = null;

            }
        })
    }
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
