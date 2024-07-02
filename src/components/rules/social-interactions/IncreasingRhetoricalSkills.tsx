import React from "react"
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RhetoricLevelingTable } from "../figures/SocialFigures";

export const ImprovingRhetoricRulesNavLink = new ArticleNavLink({
    name: "Improving Your Rhetoric",
    path: "#ImprovingRhetoric",
    render: () => <ImprovingRhetoricRules />
});

const ImprovingRhetoricRules = () => (
    <section id={ImprovingRhetoricRulesNavLink.hash} key={ImprovingRhetoricRulesNavLink.path}>
        <h2>{ImprovingRhetoricRulesNavLink.name}</h2>
        <p>
            Rhetorics are similar to skills in that, as you level them, you can increase the number of rerolls and extra rolls you can use when performing their corresponding rhetoric check. Unlike skills, rhetorics level up from 1 to 5. To define your character's personality better, you choose one primary rhetoric, one secondary rhetoric, and one tertiary rhetoric. Your primary rhetoric starts at level 2 and will increase by 1 level for every 3 levels your character grows. Your secondary rhetoric will increase by 1 level for every 4 levels your character grows. Finally, your tertiary rhetoric will increase by 1 level for every 5 levels your character grows. Below is a table to help you visualize this pattern:
        </p>
        <RhetoricLevelingTable />
    </section>
);