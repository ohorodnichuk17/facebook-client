import {Status} from "../../utils/enum";

export interface IChangePassword {
    currentPassword: string | undefined,
    newPassword: string | undefined,
    confirmNewPassword: string | undefined,
}

export interface IUserState {
    status: Status;
}