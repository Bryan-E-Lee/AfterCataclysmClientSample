import { useAuth0 } from '@auth0/auth0-react';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdventureHubConfig } from '../../apis/account/config/AdventureHubConfig';
import { HubActions } from '../../apis/Hub.Base';
import { ApplicationState } from '../../store/stores/ApplicationState';
import { UserActions } from '../../store/stores/users/UserStore.Actions';
import { ErrorBound } from '../errors/ErrorBound';
import { ErrorPage } from '../errors/ErrorPage';
import { Library } from '../library';
import { Rules } from '../rules';
import { ToastContainer } from '../toasts/ToastContainer';
import { SiteNavigation } from './nav/SiteNavigation';
import { Splash } from './Splash';
import { LibraryActions } from '../../store/stores/library/LibraryStore.Actions';
import { Account } from '../account';
import { ComingSoon } from '../filtering/ComingSoon';
import { GameMasterGuide } from '../gamemasterguide';
import { Setting } from '../setting';
import { Route, Routes, useNavigate } from 'react-router';
import { Adventures } from '../collection/adventures';
import { Characters } from '../collection/characters';

export const App: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const { allTagsLoaded } = useSelector((app: ApplicationState) => app.library);

    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(HubActions.hubOn(AdventureHubConfig.name));
        }

        if (isAuthenticated && !isLoading) {
            dispatch(UserActions.getUserAccountData());
        }
        else if (!isLoading) {
            dispatch(UserActions.clearUserAccountData());
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (!allTagsLoaded) {
            dispatch(LibraryActions.loadTags());
        }
    }, [dispatch, allTagsLoaded]);

    
    const me = useSelector((app: ApplicationState) => app.user.me);
    useEffect(() => {
        const mustCreateName = isAuthenticated && me != null && me.name == "";
        if (mustCreateName) {
            navigate("/Profile/CreateName");
        }
    }, [dispatch, me]);
    return (
        <ErrorBound>
            <SiteNavigation />
            <ToastContainer />
            <AppContents />
        </ErrorBound>
    );
}

const AppContents: React.FC = () => (
    <Routes>
        <Route path='Error/*' element={<ErrorPage />} />
        <Route path='Setting/*' element={<Setting />} />
        <Route path='Rules/*' element={<Rules />} />
        <Route path='Guide/*' element={<GameMasterGuide />} />
        <Route path='Library/*' element={<Library />} />
        <Route path='Profile/*' element={<Account />} />
        <Route path='Adventures/*' element={<Adventures />} />
        <Route path='Characters/*' element={<Characters />} />
        <Route path='ComingSoon' element={<ComingSoon />} />
        <Route path="/*" element={<><Splash /></>} />
    </Routes>
);