import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CharacterActions } from "../../../store/stores/collection/characters/CharacterStore.Actions";
import { CharacterComponent } from "./CharacterComponent";
import { CharacterListComponent } from "./CharacterList";
import { Route, Routes } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export const Characters: React.FC = () => {
    const { isLoading, user, loginWithRedirect } = useAuth0();
    if (!isLoading && user == null) {
        loginWithRedirect();
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CharacterActions.getCharacters());
    }, [dispatch])
    return (
        <main className='collection-page'>
            <div className='contents'>
                <Routes>
                    <Route path=':id' element={<CharacterComponent />} />
                    <Route path="*" element={<CharacterListComponent />} />
                </Routes>
            </div>
        </main>
    );
}