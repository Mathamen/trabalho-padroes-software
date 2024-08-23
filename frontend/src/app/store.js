import clientReducer from '../features/reducers/ClientReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer:{
        client: clientReducer,
    }
});