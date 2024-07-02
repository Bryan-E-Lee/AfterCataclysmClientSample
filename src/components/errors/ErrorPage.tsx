import React from "react";
import { useLocation } from "react-router";
import { TheCataclysm } from "../theming/texts";

export const ErrorPage = () => {
    const { search } = useLocation();
    const redirect = new URLSearchParams(search).get('redirect') || "/";
    return (
        <main>
            <div className="contents">
                <h1>
                    Something terrible happened; it's the second coming of <TheCataclysm />!
                </h1>
                <p>
                    Sorry, we encountered a problem with our service. You can try <a href={redirect}>starting over</a>.
                </p>
            </div>
        </main>
    );
}