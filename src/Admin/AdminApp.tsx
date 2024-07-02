import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ToastContainer } from "../components/toasts/ToastContainer";
import { AdminNav } from "./AdminNav";
import { AdminLibrary } from "./library-editor";

export const AdminApp: React.FC = () => {
    const { isLoading, user, loginWithRedirect } = useAuth0();
    if (!isLoading && user == null) {
        loginWithRedirect();
    }
    return (
        <>
            <AdminNav />
            <AdminLibrary />
            <ToastContainer />
        </>
    );
}