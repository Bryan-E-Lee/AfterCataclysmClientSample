import React from "react";
import { AccountNavButton } from "../components/app/nav/AccountNavButton";
import { Link } from "react-router-dom";

export const AdminNav: React.FC = () => (
    <nav className="site-nav">
        <div className="site-nav-contents">
            <div className="left-contents">
                <Link to="/">Library</Link>
            </div>
            <div className="right-contents">
                <AccountNavButton />
            </div>
        </div>
    </nav>
)