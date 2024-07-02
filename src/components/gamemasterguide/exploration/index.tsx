import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../../rules/RulesArticle";
import { ArticleProps } from "../../articles/ArticleProps";
import { GuideLinks } from "..";
import { CrossCountryGuideLink } from "./CrossCountryGuide";
import { TreasureGuideLink } from "./Treasure";
import { DungeonDelvingGuideLink } from "./DungeonDelvingGuide";
import { GuideRoot } from "../GuideRoot";

export const ExplorationGuideLink = new ArticleNavLink({
    path: "Exploration",
    name: "Exploration",
    render: (index?: number) => <ExplorationGuide index={index} siblings={GuideLinks} />,
    sublinks: [
        CrossCountryGuideLink,
        DungeonDelvingGuideLink,
        TreasureGuideLink
    ]
})

const ExplorationGuide = (props: ArticleProps) => (
    <RulesArticle {...props} root={GuideRoot} link={ExplorationGuideLink}>
        <p>
            Exploration is a great way to get players to reach out into the world and see what comes their way.
        </p>
    </RulesArticle>
)