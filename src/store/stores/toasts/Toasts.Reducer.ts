import { Action, Reducer } from "redux";
import { ToastAction } from "./Toasts.Actions";
import { ToastDefaultState, ToastState } from "./Toasts.State";

export const ToastReducer: Reducer<ToastState> = (
    state: ToastState | undefined,
    incomingAction: Action
): ToastState => {
    if(state == undefined) {
        return ToastDefaultState;
    }
    const action = incomingAction as ToastAction;
    switch(action.type) {
        case 'TOAST_PUSH':
            return { ...state, toasts: [action.toast, ...state.toasts] };
        case 'TOAST_PUSH_RANGE':
            return { ...state, toasts: [...action.toasts, ...state.toasts] };
        case 'TOAST_DISMISS':
            return { ...state, toasts: state.toasts.filter(toast => toast.id != action.toast.id) };
        case 'TOAST_POP':
            state.toasts.pop();
            return { ...state, toasts: [...state.toasts] };
        default:
            return state;
    }
}