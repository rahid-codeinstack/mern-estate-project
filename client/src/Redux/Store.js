import {applyMiddleware, configureStore} from '@reduxjs/toolkit'

import userReducer from './userSlice.js'



const Store  = configureStore({
     reducer:{
          user:userReducer,
     },
     middleware: function (getDefaultMiddleware){
        return  getDefaultMiddleware({serializableCheck:false})
     }
})

export default Store;
