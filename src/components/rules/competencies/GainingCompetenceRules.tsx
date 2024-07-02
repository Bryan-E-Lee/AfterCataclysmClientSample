import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const GainingCompetenceNavLink = new ArticleNavLink({
    name: "Gaining Competence",
    path: "#GainingCompetence",
    render: () => <GainingCompetenceRules />
});

const GainingCompetenceRules = () => (
    <section id={GainingCompetenceNavLink.hash}>
        <h2>{GainingCompetenceNavLink.name}</h2>
        <p>
            Adventuring will naturally give your character several experiences that may confer competencies on them. To represent this character growth, your character can learn new competencies over time. When it's apparent that your character has acquired the knowledge and craft necessary to have a competency, your character simply gains that competency. Similarly, if your character is already competent at something and they have challenged themselves enough to gain expertise, they simply gain expertise in that competency.
        </p>
        <p>
            Just like normal comepetencies, you can gain custom competencies too!
        </p>
        <Example>
            If your GM has created a campaign where you learned how to perform a cult's ritual to gain their trust, it makes sense that you would become competent at it.
        </Example>
    </section>
)