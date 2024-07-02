import * as React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthConfig } from '../config/AuthConfig';
import { RouterProvider } from 'react-router-dom';
import '../utils/ArrayExtensions';
import { AppRouter } from './AppRouter';

export const Root = () => {
    const { domain, clientId } = AuthConfig;
    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            audience={`https://${domain}/api/v2/`}
            scope='read:current_user'>
            <RouterProvider router={AppRouter} />
        </Auth0Provider>
    );
};
