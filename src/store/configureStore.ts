import { configureStore, Dispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { AccountApiServerConfig } from '../apis/account/config/AccountApiServerConfig';
import { AdventureHub } from '../apis/account/Hub.Adventure';
import { createRootReducer } from './RootReducer';
import { ApiSetAdventureHub } from './stores/api/ApiStore.Actions';
import { ApplicationState } from './stores/ApplicationState';

function configureAppStore(preloadedState: ApplicationState) {
    const reducer = createRootReducer();

    const adventureHub = new AdventureHub(AccountApiServerConfig.AdventureHubConfig);

    const middleware = [thunk, ...adventureHub.middleware];

    const store = configureStore({
        reducer,
        middleware,
        preloadedState,
    });

    setupHubs(adventureHub, store.dispatch);
    return store;
}

export type StoreDispatch = ReturnType<typeof configureAppStore>['dispatch'];

export type StoreGetState = ReturnType<typeof configureAppStore>['getState'];

export default configureAppStore;

function setupHubs(adventureHub: AdventureHub, dispatch: Dispatch<any>) {
    adventureHub.dispatch = dispatch;
    const addAdventureHub: ApiSetAdventureHub = { type: 'API_SET_HUB_ADVENTURE', hub: adventureHub };
    dispatch(addAdventureHub);
}