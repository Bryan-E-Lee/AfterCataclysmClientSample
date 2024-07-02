import './adventures.scss';
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AdventureActions } from "../../../store/stores/adventures/AdventureStore.Actions";
import { AdventureComponent } from "./AdventureComponent";
import { AdventureList } from "./AdventureList";
import { JoinAdventure } from './JoinAdventure';
import { Route, Routes } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

export const Adventures: React.FC = () => {
    const { isLoading, user, loginWithRedirect } = useAuth0();
    if (!isLoading && user == null) {
        loginWithRedirect();
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AdventureActions.getAdventures())
    }, [dispatch]);
    return (
        
        <main className='collection-page'>
            <div className='contents'>
                <Routes>
                    <Route path=":inviteId/Join" element={<JoinAdventure />} />
                    <Route path=":id" element={<AdventureComponent />} />
                    <Route path="*" element={<AdventureList />} />
                </Routes>
            </div>
        </main>
    )
}