import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const ActRulesLink = new ArticleNavLink({
    name: "Acts",
    path: "#Acts",
    render: () => <ActRules />
})

const ActRules = () => (
    <section id={ActRulesLink.hash} key={ActRulesLink.path}>
        <h2>{ActRulesLink.name}</h2>
        <p>
            An act is a collection of scenes that represents a common subtheme or section of the overarching narrative. The structure of acts isn't known in advance, the scenes that occur and how they play out is up to you and your party. Your GM will create scenes for you and the party based on the decisions you make as you traverse through the act.
        </p>
        <Example>
            Two different acts on Chelle's journey might include slaying The Glowing Hydra and retrieving the artifacts stolen by the Bleeding Wolves Gang. Both might be smaller stories in the greater quest to find the legendary Fountain Of Youth.
        </Example>
    </section>
)