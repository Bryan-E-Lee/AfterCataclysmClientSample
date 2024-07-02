import './site.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureAppStore from './store/configureStore';
import { setDefaultOptions } from 'esri-loader';
import { Root } from './components/Root';
import { ApplicationState } from './store/stores/ApplicationState';

setDefaultOptions({
    url: 'https://js.arcgis.com/next/',
});

const store = configureAppStore({} as ApplicationState);
(async () => {
    ReactDOM.render(
        <React.StrictMode>
            <ReduxProvider store={store}>
                <Root />
            </ReduxProvider>
        </React.StrictMode>,
        document.getElementById('app')
    );
})();
