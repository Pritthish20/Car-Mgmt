import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query/react'
import {apiSlice} from './api/apiSlice.js'
import authReducer from './slice/authSlice.js'


const store=configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck: false,
}).concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch)
export default store;