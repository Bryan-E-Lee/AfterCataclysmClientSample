import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const CustomHazardsGuideLink = new ArticleNavLink({
    name: "Custom Hazards",
    path: "#CustomHazards",
    render: () => <CustomHazardsGuide />
})

const CustomHazardsGuide = () => (
    <section id={CustomHazardsGuideLink.hash}>
        <h2>{CustomHazardsGuideLink.name}</h2>
    </section>
)