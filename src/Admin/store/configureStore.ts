import { configureStore, DeepPartial } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import { createAdminRootReducer } from './RootReducer';
import { AdminState } from './stores/AdminState';

function configureAdminStore(preloadedState: AdminState) {
    const reducer = createAdminRootReducer();
    const middleware = [thunk];

    return configureStore({
        reducer,
        middleware,
        preloadedState,
    });
}

export type StoreDispatch = ReturnType<typeof configureAdminStore>['dispatch'];

export type StoreGetState = ReturnType<typeof configureAdminStore>['getState'];

export default configureAdminStore;
