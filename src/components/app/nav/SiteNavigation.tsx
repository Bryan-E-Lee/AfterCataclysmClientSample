import * as React from 'react';
import { AccountNav } from './AccountNav';
import { useAuth0 } from '@auth0/auth0-react';
import { useRef, useState } from 'react';
import { MenuIcon } from '../../icons';
import { ExternalClickDetector } from '../../../utils/events/ExternalClickDetector';
import { Link } from "react-router-dom";

export const SiteNavigation: React.FC = (): JSX.Element => {
    const [showHamburgerMenu, setHamburgerMenu] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
        <nav className="site-nav">
            <div className="site-nav-contents">
                <div className="left-contents hamburger-content">
                    <button ref={buttonRef} className='hamburger-button'
                        onClick={() => setHamburgerMenu(!showHamburgerMenu)}>
                        <MenuIcon />
                    </button>
                    <ExternalClickDetector className={`context-menu ${showHamburgerMenu ? 'visible' : 'hidden'}`}
                        onExternalClickDetected={() => setHamburgerMenu(false)} additionalRefs={[buttonRef]}>
                        <NavLinks />
                    </ExternalClickDetector>
                </div>
                <div className="left-contents normal-content">
                    <NavLinks />
                </div>
                <div className='right-contents'>
                    <AccountNav />
                </div>
            </div>
        </nav>
    );
}

const NavLinks: React.FC = () => {
    return (
        <>
            <Link to="/">500 AC</Link>
            <AuthenticatedLinks />
            <Link to="/Setting">Setting</Link>
            <Link to="/Rules/TableOfContents">Rules</Link>
            <Link to="/Guide/TableOfContents">GM Guide</Link>
            <Link to="/Library">Library</Link>
        </>
    );
}

const AuthenticatedLinks: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return null;
    }
    return (
        <>
            <Link to="/Adventures">My Adventures</Link>
            <Link to="/Characters">My Characters</Link>
        </>
    )
}