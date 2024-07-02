import { ValidationMessage } from "../../../apis/ValidationMessage";
import { ToastConfig } from "../../../config/ToastConfig";
import { ErrorToast, InfoToast, SuccessToast, Toast, WarningToast } from "../../../entities/toasts/Toasts";
import { AppThunkAction } from "../ApplicationState";

type ToastPush = { type: 'TOAST_PUSH', toast: Toast };
type ToastPushRange = { type: 'TOAST_PUSH_RANGE', toasts: Toast[] };
type ToastDismiss = { type: 'TOAST_DISMISS', toast: Toast }
type ToastPop = { type: 'TOAST_POP' }
export type ToastAction = ToastPush
    | ToastPushRange
    | ToastDismiss
    | ToastPop;

export const ToastActions = {
    toastSuccess: (message: React.ReactNode, duration: number = ToastConfig.ToastDuration): AppThunkAction<ToastAction> =>
        (dispatch) => ToastDispatchables.toast(new SuccessToast(message), dispatch, duration),

    toastInfo: (message: React.ReactNode, duration: number = ToastConfig.ToastDuration): AppThunkAction<ToastAction> =>
        (dispatch) => ToastDispatchables.toast(new InfoToast(message), dispatch, duration),

    toastWarning: (message: React.ReactNode, duration: number = ToastConfig.ToastDuration): AppThunkAction<ToastAction> =>
        (dispatch) => ToastDispatchables.toast(new WarningToast(message), dispatch, duration),

    toastError: (message: React.ReactNode, duration: number = ToastConfig.ToastDuration): AppThunkAction<ToastAction> =>
        (dispatch) => ToastDispatchables.toast(new ErrorToast(message), dispatch, duration),

    dismissToast: (toast: Toast): AppThunkAction<ToastDismiss> =>
        (dispatch) => {
            clearTimeout(<number>toast.timeout);
            dispatch({ type: 'TOAST_DISMISS', toast });
        }
}

type ToastDispatchable = (action: ToastAction) => void;
const createToastDispatch = (duration: number, dispatch: ToastDispatchable) => setTimeout(() => dispatch({ type: 'TOAST_POP' }), duration);

export const ToastDispatchables = {
    toast: (toast: Toast, dispatch: ToastDispatchable, duration: number = ToastConfig.ToastDuration): void => {
        toast.timeout = createToastDispatch(duration, dispatch);
        dispatch({ type: 'TOAST_PUSH', toast });
    },

    toastRange: (toasts: Toast[], dispatch: ToastDispatchable, duration: number = ToastConfig.ToastDuration): void => {
        for(const toast of toasts) {
            toast.timeout = createToastDispatch(duration, dispatch);
        }
        dispatch({ type: 'TOAST_PUSH_RANGE', toasts });
    },

    toastValidationResults: (validationResults: ValidationMessage[], dispatch: ToastDispatchable, duration: number = ToastConfig.ToastDuration): void => {
        const toasts = validationResults.map(vr => new ErrorToast(vr.message));
        ToastDispatchables.toastRange(toasts, dispatch, duration);
    }
}