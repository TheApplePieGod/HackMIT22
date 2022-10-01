import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import { rootReducer } from './RootReducer';

const makeStore = () => configureStore({
    reducer: rootReducer
});

// https://redux-toolkit.js.org/tutorials/quick-start
// Infer the `ReduxState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>
export type ReduxState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const reduxWrapper = createWrapper<AppStore>(makeStore);