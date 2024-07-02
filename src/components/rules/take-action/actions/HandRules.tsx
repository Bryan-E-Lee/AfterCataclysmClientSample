import React from "react";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink"
import { Example } from "../../../directives/Directives";
import { Link } from "react-router-dom";

export const HandRulesLink = new ArticleNavLink({
    name: "Hands",
    path: "#Hands",
    render: () => <HandRules />,
});

export const HandRules = () => (
    <section id={HandRulesLink.hash}>
        <h2>{HandRulesLink.name}</h2>
        <p>
            You only have 2 hands (for now at least!) to work with. When you act, you can act using up to 2 of your hands until the next time you are allowed to act.
        </p>
        <Example>
            Chelle is holding a blaster in one hand and using her trusty turntable (focus) with the other. When she has the opportunity to act (such as when it's her turn during an <Link to="/Rules/ActionScenes">Action Scene</Link>), she can use both her blaster and the turntable, the blaster twice, or the turntable twice.
        </Example>
        <Example>
            If Chelle instead had a laser rifle strapped to her back (which requires 2 hands to use) and had her turntable, then she would only be able to either use the laser rifle once or the turntable twice as part of her action.
        </Example>
    </section>
)