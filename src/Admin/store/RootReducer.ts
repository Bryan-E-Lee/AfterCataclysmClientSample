import { combineReducers } from 'redux';
import { TooltipReducer } from '../../store/stores/details/TooltipStore.Reducer';
import { ToastReducer } from '../../store/stores/toasts/Toasts.Reducer';
import { AdminApiReducer } from './stores/api/Admin.ApiStore.Reducer';
import { AdminLibraryReducer } from './stores/library/AdminLibraryStore.Reducer';

export const createAdminRootReducer = () => combineReducers({
    api: AdminApiReducer,
    library: AdminLibraryReducer,
    toast: ToastReducer,
    tooltip: TooltipReducer,
    // router: connectRouter(history)
});
