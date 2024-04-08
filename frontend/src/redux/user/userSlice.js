import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../Services/User/UserService";


// Define an asynchronous thunk to fetch users
export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        try {
            const response = await UserService.getUsers()
            return response.data.users;
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    users: [],
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        signOut: (state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        addUser:(state,action)=>{
            state.users.push(action.payload)
        },
        removeUser:(state,action)=>{
            state.users = state.users.filter((user)=>(
                user.id!==action.payload
            ))
        },
    },
    extraReducers: builder=>{
        // Handle fetching users asynchronously
        builder.addCase(fetchUsers.pending,(state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(fetchUsers.fulfilled,(state) => {
            state.loading = false;
            state.users = action.payload;
        })
        builder.addCase(fetchUsers.rejected,(state) => {
            state.loading = false;
            state.error = true;
        })
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,  
    updateUserSuccess,  
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOut,
    addUser,
    removeUser,
} = userSlice.actions;

export default userSlice.reducer;
