import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const CustomModsGuideLink = new ArticleNavLink({
    name: "Custom Mods",
    path: "#CustomMods",
    render: () => <CustomModsGuide />
})

const CustomModsGuide = () => (
    <section id={CustomModsGuideLink.hash}>
        <h2>{CustomModsGuideLink.name}</h2>
    </section>
)