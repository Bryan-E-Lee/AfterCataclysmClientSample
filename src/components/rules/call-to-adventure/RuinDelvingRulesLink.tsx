import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const DungeonDelvingRulesLink = new ArticleNavLink({
    path: "#DungeonDelving",
    name: "Dungeon Delving",
    render: () => <DungeonDelvingRules />
})

const DungeonDelvingRules = () => (
    <section id={DungeonDelvingRulesLink.hash} key={DungeonDelvingRulesLink.path}>
        <h2>{DungeonDelvingRulesLink.name}</h2>
        <p>
            Coming Soon!
        </p>
    </section>
)