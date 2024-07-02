import '../site.scss';
import './admin.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureAdminStore from './store/configureStore';
import { setDefaultOptions } from 'esri-loader';
import { AdminRoot } from './AdminRoot';
import { AdminState } from './store/stores/AdminState';

setDefaultOptions({
    url: 'https://js.arcgis.com/next/',
});

const store = configureAdminStore({} as AdminState);
(async () => {
    ReactDOM.render(
        <React.StrictMode>
            <ReduxProvider store={store}>
                <AdminRoot store={store} />
            </ReduxProvider>
        </React.StrictMode>,
        document.getElementById('app')
    );
})();
