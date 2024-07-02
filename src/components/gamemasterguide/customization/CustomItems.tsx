import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const CustomItemsGuideLink = new ArticleNavLink({
    name: "Custom Items",
    path: "#CustomItems",
    render: () => <CustomItemsGuide />
})

const CustomItemsGuide = () => (
    <section id={CustomItemsGuideLink.hash}>
        <h2>{CustomItemsGuideLink.name}</h2>
    </section>
)