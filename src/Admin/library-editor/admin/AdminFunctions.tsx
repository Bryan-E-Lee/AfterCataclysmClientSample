import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminFunctions: React.FC = () => {
    const dispatch = useDispatch();
    const { user, loginWithRedirect } = useAuth0();
    useEffect(() => {
        if (user == null) {
            loginWithRedirect();
        }
    }, [user, loginWithRedirect]);
    return (
        <div>
            <ThemedButton onClick={() => dispatch(AdminLibraryActions.refreshItemsWithMods())}>
                Refresh Items With Mods
            </ThemedButton>
        </div>
    );
}