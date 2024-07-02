import { Toast } from "../../../entities/toasts/Toasts";

export interface ToastState {
    toasts: Toast[];
}

export interface IToastableApp { toast: ToastState }

export const ToastDefaultState = {
    toasts: []
}