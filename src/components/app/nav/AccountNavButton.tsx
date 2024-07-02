import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const AccountNavButton: React.FC = () => {
    const { isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
    if(isLoading) {
        return null;
    }
    //TODO: Reset state
    const login = () => {
        loginWithRedirect({
            prompt: "consent"
        });
    }
    return isAuthenticated
        ? <a onClick={() => logout({ returnTo: window.location.origin })}>Log Out</a>
        : <a onClick={login}>Log In</a>
}