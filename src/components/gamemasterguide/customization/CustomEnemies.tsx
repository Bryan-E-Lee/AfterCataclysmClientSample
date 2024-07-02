import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const CustomEnemiesGuideLink = new ArticleNavLink({
    name: "Custom Enemies",
    path: "#CustomEnemies",
    render: () => <CustomEnemiesGuide />
})

const CustomEnemiesGuide = () => (
    <section id={CustomEnemiesGuideLink.hash}>
        <h2>{CustomEnemiesGuideLink.name}</h2>
    </section>
)