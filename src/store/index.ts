import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./account/account.slice.ts";
import userReducer from "./user/user.slice.ts";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        user: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;