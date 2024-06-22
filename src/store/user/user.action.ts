import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../../utils/api/apiClient.ts";
import {IChangePassword} from "../../interfaces/user";
import {handleAxiosError} from "../../utils/error";

export const changePassword = createAsyncThunk(
    'User/change-password',
    async (payload: IChangePassword, {rejectWithValue}) => {
        try {
            const response = await apiClient.post('/api/User/change-password', payload);
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);