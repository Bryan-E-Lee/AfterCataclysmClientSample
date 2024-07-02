import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { ArticleProps } from "../../articles/ArticleProps";
import { GuideLinks } from "..";
import { RulesArticle } from "../../rules/RulesArticle";
import { RollingForEnemiesGuideLink } from "./RollingForEnemies";
import { StatBlocksGuideLink } from "./StatBlocks";
import { EnvironmentalHazardsGuideLink } from "./EnvironmentalHazards";
import { CreatingActionScenesGuideLink } from "./CreatingActionScenes";
import { GuideRoot } from "../GuideRoot";

export const ActionScenesGuideLink = new ArticleNavLink({
    path: "ActionScenes",
    name: "Action Scenes",
    render: (index?: number) => <ActionScenesGuide index={index} siblings={GuideLinks} />,
    sublinks: [
        StatBlocksGuideLink,
        RollingForEnemiesGuideLink,
        EnvironmentalHazardsGuideLink,
        CreatingActionScenesGuideLink,
    ]
})

const ActionScenesGuide = (props: ArticleProps) => (
    <RulesArticle {...props} root={GuideRoot} link={ActionScenesGuideLink}>
        <p>
            Enemies are the most common conflict your players will encounter in the wasteland. This chapter of the GM Guide will help you navigate how to take control of enemies and what is different between the rules for enemies and the rules for players.
        </p>
    </RulesArticle>
)