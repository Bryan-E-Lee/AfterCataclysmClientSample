import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { AccountNavButton } from "./AccountNavButton";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { Link } from "react-router-dom";

export const AccountNav: React.FC = () => {
    const { user, isAuthenticated } = useAuth0();
    const currentUser = useSelector((app: ApplicationState) => app.user.me);
    return (
        <>
            {isAuthenticated && currentUser && (
            <Link className='user-info' to='/Profile'>
                {currentUser.name == "" ? user!.name : currentUser.name}
            </Link>)}
            <AccountNavButton />
        </>
    );
}