import { SuccessToast } from "../../../entities/toasts/Toasts";
import { UserAccount } from "../../../entities/user/UserAccount";
import { AppThunkAction } from "../ApplicationState";
import { ToastAction, ToastDispatchables } from "../toasts/Toasts.Actions";

type UserSet = { type: 'USER_SET', userAccount: UserAccount }
type UserSetAdventureConnection = { type: 'USER_SET_ADVENTURE_CONNECTION', adventureConnectionId: string | null }
export type UsersGet = { type: 'USERS_GET', users: UserAccount[] }
type UserClear = { type: 'USER_CLEAR' }
type UserSetDisplayName = { type: 'USER_SET_DISPLAY_NAME', displayName: string, identifier: string }

export type UserAction = UserSet | UserSetAdventureConnection | UsersGet | UserClear | UserSetDisplayName;

export const UserActions = {
    setAdventureConnection: (adventureConnectionId: string): AppThunkAction<UserSetAdventureConnection> =>
        (dispatch) => dispatch({ type: 'USER_SET_ADVENTURE_CONNECTION', adventureConnectionId }),

    getUserAccountData: (): AppThunkAction<UserSet | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.users;
            const response = await api.getUserData();
            if (response.status == 'Success') {
                dispatch({ type: 'USER_SET', userAccount: response.payload });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },

    clearUserAccountData: (): AppThunkAction<UserClear> =>
        (dispatch) => {
            dispatch({ type: 'USER_CLEAR' });
        },

    getUsersByIds: (...ids: string[]): AppThunkAction<UsersGet | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.users;
            const response = await api.getUsersByIds(ids);
            if (response.status == 'Success') {
                dispatch({ type: 'USERS_GET', users: response.payload });
            }
            else {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
            }
        },

    submitDisplayName: (displayName: string, successCallback: () => unknown): AppThunkAction<UserSetDisplayName | ToastAction> =>
        async (dispatch, getState) => {
            const api = getState().api.users;
            const response = await api.setDisplayName(displayName);
            if (response.status == 'Error') {
                ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                return;
            }
            
            const identifier = response.payload;
            dispatch({ type: 'USER_SET_DISPLAY_NAME', displayName, identifier });
            successCallback();
            ToastDispatchables.toast(new SuccessToast(`User name set, Welcome ${displayName}#${identifier}!`), dispatch);
        }
}