import * as React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthConfig } from '../config/AuthConfig';
import '../utils/ArrayExtensions';
import { RouterProvider } from 'react-router';
import { AdminRouter } from './AdminRouter';

export const AdminRoot = () => {
    const { domain, clientId } = AuthConfig;
    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            audience={`https://${domain}/api/v2/`}
            scope='read:library create:library update:library delete:library'>
            <RouterProvider router={AdminRouter} />
        </Auth0Provider>
    );
};
