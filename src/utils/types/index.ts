import {AsyncThunk} from "@reduxjs/toolkit";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>