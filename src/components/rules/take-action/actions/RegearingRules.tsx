import React from "react";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink";

export const RegearingRulesLink = new ArticleNavLink({
    name: 'Regearing',
    path: '#Regearing'
});

export const RegearingRules = () => (
    <section id={RegearingRulesLink.hash} key={RegearingRulesLink.path}>
        <h3>{RegearingRulesLink.name}</h3>
        <p>
            Sometimes you need to exchange gear during an action scene. You can do so by expending your action and 6 hexes of movement to exchange one mod on an equipped item with another or to stow a weapon into your inventory. To retrieve a weapon from your inventory, you must spend an action but no movement. Swapping out gear is very costly, especially swapping weapons! Save it as a last-ditch effort rather than something you rely on.
        </p>
    </section>
)