import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {Axios} from "axios";
import { API_BASE_URL } from "../../Config/Api.js";

const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null,
  };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     },
//   },
// });

 const loginUser = createAsyncThunk(
    "user/login",
    async (loginData) =>{
        try{
            const {data}  = await Axios.post(`${API_BASE_URL}/auth/signin`,loginData);
            localStorage.setItem("jwt",data.jwt);
            localStorage.setItem("userData",data);
            return data;


        }catch(error){
            throw error;
        }
    }
);

 const registetUser = createAsyncThunk("user/register",
    async (registerData) =>{
        try{
            const {data} = await Axios.post(`${API_BASE_URL}/auth/signup`,registerData);
            localStorage.setItem("jwt",data.jwt);
            return data.jwt;
        }catch(error){
            throw error;
        }
    }
);


export const  userSlice  = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:(state) => {
            state.user = null;
            state.jwt = null ;
            localStorage.removeItem("jwt");
            localStorage.removeItem("userData");
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(loginUser.pending, (state) =>{
            state.loading = true;
            state.error = null ;
        })
        .addCase(loginUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.user = action.payload; // Assuming user data is retrieved in getUserProfile
            state.jwt = action.payload.jwt;
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.payload
        })
        .addCase(registetUser.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(registetUser.fulfilled,(state,action)=>{
            state.user= action.payload,
            state.jwt= action.payload.jwt,
            state.loading= false
        })
        .addCase(registetUser.rejected, (state)=>{
            state.user= null,
            state.loading= false,
            state.error = true
        })
    }
})


export  { loginUser,registetUser } ;
export default userSlice.reducer ;
export const {logout} = userSlice.actions;