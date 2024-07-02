import { ThemedButton } from "../inputs/buttons/ThemedButton";
import "./splash.scss";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const Splash: React.FC = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <main className="splash-page">
            <div className="splash-area necromancer">
                <div className="contents">
                    <h1>500 AC</h1>
                    <h2>(After Cataclysm)</h2>
                    <h3>
                        An upcoming post-apocalyptic TTRPG where players
                        <br />
                        twist fate to create a brighter future.
                    </h3>
                </div>
            </div>
            
            <hr className="splash-divider" />

            <div className="splash-area about-game">
                <div className="contents">
                    <div className="hook-image" >
                        <img src="/public/assets/images/splash/goblin.png" />
                    </div>
                    <div className="hook">
                        <h2>What Is 500 AC?</h2>
                        <p>
                            <em>500 AC</em> is a new and innovative take on how to play post-apocalyptic games and TTRPGs in general. Unlike most games where you roll to see if you get to do what you want, in <em>500 AC</em> you choose from the available outcomes and <em className="super-emphasize">it. just. happens.</em> Your destiny is your own.
                        </p>
                        <p>
                            Roll your dice and form poker hands by cleverly rerolling to rewrite fate with the *Cataclysm System*.
                        </p>
                    
                        <Link to="/Rules/TableOfContents" className="splash-rules-button">
                            <ThemedButton disabled={false}>
                                View The Rulebook For Free
                            </ThemedButton>
                        </Link>
                    </div>
                </div>
            </div>

            <hr className="splash-divider" />

            <div className="splash-area call-to-action">
                <div className="contents">
                    <div className="hook call-hook">
                        <p>
                            Use our character sheet tool or download them for yourself.
                            <br />
                            What are you waiting for?
                        </p>
                        <div className="links">
                            <div className="link-wrapper">
                                <a className="dark-link" onClick={loginWithRedirect}>Create an Account For Tools!</a>
                            </div>
                            <div className="link-wrapper">
                                <Link to="/ComingSoon" className="dark-link disabled">Download the Character Sheet</Link>
                            </div>
                        </div>
                        <div className="sub-note">
                            *We've noticed people with cookies disabled can have issues creating an account. We are working to resolve this issue but in the meantime, if you feel up to it, you can allow cookies from this site.
                        </div>
                    </div>
                    <div className="hook-image flip blockifiable">
                        <img src="/public/assets/images/splash/bard-full-2.png" />
                    </div>
                </div>
            </div>
        </main>
    );
}