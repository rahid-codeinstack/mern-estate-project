import {applyMiddleware, configureStore} from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice.js'


const persistConfige = {
     key: "root",
     storage,
     version: 1,
}

const rootReducer = combineReducers({
     user: userReducer,
});
const persistreducer = persistReducer(persistConfige,rootReducer)

const Store  = configureStore({
     reducer:persistreducer,
     middleware: function (getDefaultMiddleware){
        return  getDefaultMiddleware({serializableCheck:false})
     }
})

export const persistore = persistStore(Store);
export default Store;
