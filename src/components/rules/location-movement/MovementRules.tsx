import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const MovementRulesLink = new ArticleNavLink({
    path: "#Movement",
    name: "Movement",
    render: () => <MovementRules />
})

const MovementRules = () => (
    <section id={MovementRulesLink.hash}>
        <h2>{MovementRulesLink.name}</h2>
        <p>
            Moving around is pretty simple. By default, your character can move a distance of 6 hexes (12m or about 36ft) in roughly 6 seconds or one round of an action scene. Whenever you move through a hex, your movement for the round is reduced by 1.
        </p>
        <h3>Rough Terrain</h3>
        <p>
            Rough terrain is more difficult to cross. It costs an additional hex of movement to enter a hex of rough terrain.
        </p>
    </section>
);