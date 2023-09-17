import { OperationStatus } from "./enums";

export interface IUser {
    name: string;
}
export interface IState {
    userList: IUser[];
    operationStatus: OperationStatus;
    selectedUserList: IUser[];
}