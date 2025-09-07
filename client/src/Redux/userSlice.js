import { createSlice } from "@reduxjs/toolkit";                                                                               

const initialState = {
     user:{},
     Loading:false,
     Error:null,
}

const userReducer = {
          signInStart:function(state){
               state.Loading =  true;
               state.Error = null;

          },
          signInSuccess: function (state, action ) { 
                    state.user = action.payloade;
                    state.Loading = false;
                    state.Error = null;
          },
          signInFailure: function (state , action){
                   state.Loading = false;
                   state.Error = action.payloade;
               }

}

const userSlice = createSlice({
          name:"user",
          initialState,
          reducers:userReducer,
})


export const {signInStart , signInFailure , signInSuccess } = userSlice.actions;
export default userSlice.reducer;