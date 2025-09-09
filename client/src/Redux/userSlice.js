import { createActionCreatorInvariantMiddleware, createSlice } from "@reduxjs/toolkit";                                                                               

const initialState = {
     user:null,
     Loading:false,
     Error:null,
}



const userSlice = createSlice({
          name:"user",
          initialState,
     reducers:{
          signInStart: function (state) {
               state.Loading = true;
               state.Error = null;

          },
          signInSuccess: function (state, action) {
               state.user = action.payload;
               state.Loading = false;
               state.Error = null;
          },
          signInFailure: function (state, action) {
               state.Loading = false;
               state.Error = action.payloade;
          },
               updateStart:function (state){
                    state.Loading = true;
                    
               }
               ,
               updateSuccess:function (state,action){
                     state.Loading = false;
                     state.user= action.payload;
                     state.Error=null;

               }
               ,
               updateFailure:function (state,action){
                    state.Loading = false;
                    state.Error = action.payload;

               }
               ,
                deleteUser:function(state,action){
                     state.user= action.payload;
                     state.Loading = false;

                },
                deleteFailure: function (state,action){
                    state.Error = action.payload;
                    state.Loading = false;

                },
                   signOutSuccess:function (state,action){
                         state.user = action.payload;
                         state.Loading = false;

                   }
                   ,
                   signOutFailure:function (state,action){
                          state.Error = action.payload;
                          state.Loading=false;

                   }
     }
})


export const { deleteUser,deleteFailure, signInStart  , signOutFailure , signOutSuccess, signInFailure , signInSuccess , updateStart , updateFailure , updateSuccess  } = userSlice.actions;
export default userSlice.reducer;