import React from "react";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink";

export const InteractRulesLink = new ArticleNavLink({
    name: 'Interact',
    path: '#Interact'
});

export const InteractRules: React.FC = () => (
    <section id={InteractRulesLink.hash} key={InteractRulesLink.path}>
        <h3>{InteractRulesLink.name}</h3>
        <p>
            During action scenes, players can interact with objects in the world.
            Pushing a button, opening a door, or logging into a computer
            all constitute object interactions.
        </p>
        <p>
            To interact with an object, the player simply describes what
            they are interacting with in their hex or a nearby hex.
            Interacting with an object normally costs 1 movement, but the
            GM may decide that an interaction requires more movement or cost
            no movement at all.
        </p>
    </section>
)