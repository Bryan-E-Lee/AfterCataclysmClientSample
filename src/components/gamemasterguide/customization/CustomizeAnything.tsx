import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const CustomAnythingGuideLink = new ArticleNavLink({
    name: "Custom Anything?",
    path: "#CustomAnything",
    render: () => <CustomAnythingGuide />
})

const CustomAnythingGuide = () => (
    <section id={CustomAnythingGuideLink.hash}>
        <h2>{CustomAnythingGuideLink.name}</h2>
    </section>
)