import React from "react";
import { ArticleNavigation } from "../articles/navigation/article-navigation/ArticleNavigation";
import { ArticleNavLink } from "../articles/navigation/article-navigation/ArticleNavLink";
import { WhatHappenedHereLink } from "./WhatHappenedHere";
import { WhatsDifferentLink } from "./WhatsDifferent";
import { PlacesOfInterestLink } from "./PlacesOfInterest";

const SettingLinks: ArticleNavLink[] = [
    WhatHappenedHereLink,
    WhatsDifferentLink,
    PlacesOfInterestLink,
];

export const Setting = () => {
    return (
        <main className="game-info-page">
            <div className="contents">
                <ArticleNavigation links={SettingLinks}>
                    500 AC
                </ArticleNavigation>
                <article id="Top">
                    <section>
                        <h1>500 AC</h1>
                        {SettingLinks.map((link, index) => {
                            const inner = link.render(index);
                            if (inner == null) {
                                return undefined;
                            }
                            return (
                                <div key={link.path}>
                                    {inner}
                                </div>
                            )
                        })}
                    </section>
                </article>
            </div>
        </main>
    );
}