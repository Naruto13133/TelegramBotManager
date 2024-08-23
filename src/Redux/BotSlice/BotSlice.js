// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {  TELEGRAM_API_VERFICATION } from "../../Config/Api"
// import { validateService } from "../../Interface/ServiceInterface";
// import {Axios} from "axios";


// const Api_Bot_initialState = {
//     services:[
        
//     ],
//     isLoading:false,
//     test:""
// }
//  const get_telgram_bot_status = createAsyncThunk(
//     "getupdate",
//     async ({key,serviceName}) =>{
//         try{
//             console.log("telegram bot thunk func called")
//             const {data} = await Axios.post(`${TELEGRAM_API_VERFICATION}`,{key,serviceName});
//             return data;
//         }catch(error){
//             // throw error;
//         }
//     }
// );



// export const telegramSlice = createSlice({
//     name:"telegram",
//     initialState:Api_Bot_initialState,
//     reducers:{
//        logout:(state) => {
//         state.services = {};
//         state.telgram_bot = {};
//        },
//        removeService:(state,action)=>{
//             const serviceId = action.payload.key;

//        }
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(get_telgram_bot_status.pending, (state)=>{
//             state.services.isLoading = true;
//         })
//         .addCase(get_telgram_bot_status.fulfilled, (state, action) => {
//            const newService = action.payload;
//            if(validateService(newService) 
//            && newService.key().includes("telegram")){
//             state.ApiService.services.push(newService);
//            }
//            state.isLoading = false;
//         })
//         .addCase(get_telgram_bot_status.rejected, (state, action) => {
//            const newService = action.payload();
//             if(!validateService(newService) 
//                 && newService.key().includes("telegram")){
//                  state.services.push(newService);
//                 }
//                 console.log("failedddddd")
//             state.isLoading = false;
//             state.test ="error is here"
//         })
        
//     }
// })

// export {get_telgram_bot_status} ;
// export const { logout } = telegramSlice.actions;
// export default telegramSlice.reducer;




//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<





import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TELEGRAM_API_VERFICATION } from "../../Config/Api";
import { validateService } from "../../Interface/ServiceInterface";

const Api_Bot_initialState = {
  
  services: [],
  isLoading: false,
  test: "",
  error:"",
  jwt:"",
};

// Correcting the thunk action to receive a single argument
export const get_telgram_bot_status = createAsyncThunk(
  "telegram/get_telgram_bot_status",
  async ({ key, serviceName }, { rejectWithValue }) => {
    try {
      console.log("telegram bot thunk func called");
      const { data } = await axios.post(`${TELEGRAM_API_VERFICATION}`, {
        key,
        serviceName,
      });
      console.log("data")
      console.log(data);
      return data;
    } catch (error) {
      console.log("error in telegram bot thunk func", error);
      return rejectWithValue(error.response.data);
    }
  }
);

 const telegramSlice = createSlice({
  name: "telegram",
  initialState: Api_Bot_initialState, // Ensure initialState is correctly placed
  reducers: {
    logout: (state) => {
      state.services = [];
      state.telegram_bot = {};
    },
    removeService: (state, action) => {
      const serviceId = action.payload.key;
      state.services = state.services.filter(
        (service) => service.id !== serviceId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_telgram_bot_status.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_telgram_bot_status.fulfilled, (state, action) => {
        const newService = action.payload;
        console.log(action.payload)
        if (validateService(newService) ) {
          console.log("inside the validateService(newService) ")
          state.services.push(newService);
        }
        console.log("outside the if block")
        state.isLoading = false;
      })
      .addCase(get_telgram_bot_status.rejected, (state, action) => {
        state.isLoading = false;
        state.test = "error is here";
        console.error("Failed to fetch telegram bot status:", action.payload);
      });
  },
});

export const { logout, removeService } = telegramSlice.actions;
export default telegramSlice.reducer;

