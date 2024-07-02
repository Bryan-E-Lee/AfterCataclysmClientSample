import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const CustomCompetenciesNavLink = new ArticleNavLink({
    name: "Custom Competencies",
    path: "#CustomCompetencies",
    render: () => <CustomCompetencyRules />
});

const CustomCompetencyRules = () => (
    <section id={CustomCompetenciesNavLink.hash}>
        <h2 id={CustomCompetenciesNavLink.hash}>{CustomCompetenciesNavLink.name}</h2>
        <p>
            Not every competency you can imagine will be represented in the provided list of competencies. When it makes sense for your character to be competent at something that isn't on that list, you and your GM can create a custom competency to represent it. Like the competencies in the official list, you should give it a name, a description, and a category. Similarly, you can be an expert in a custom competency like any other competency.
        </p>
    </section>
)