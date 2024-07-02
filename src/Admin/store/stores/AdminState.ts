import { TooltipState } from "../../../store/stores/details/TooltipStore.State";
import { IToastableApp, ToastState } from "../../../store/stores/toasts/Toasts.State";
import { AdminApiState } from "./api/Admin.ApiStore.State";
import { AdminLibraryState } from "./library/AdminLibraryStore.State";

export interface AdminState extends IToastableApp {
    api: AdminApiState,
    library: AdminLibraryState;
    toast: ToastState;
    tooltip: TooltipState;
}

export interface AdminThunkAction<TAction> {
    (
        dispatch: (action: TAction) => void,
        getState: () => AdminState
    ): void;
}
