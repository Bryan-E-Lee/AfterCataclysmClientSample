import React from "react";
import { GuideLinks } from "..";
import { ArticleProps } from "../../articles/ArticleProps";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../../rules/RulesArticle";
import { GuideRoot } from "../GuideRoot";
import { CreatingAdventuresGuideLink } from "./CreatingAdventures";
import { AdventureStructureGuideLink } from "./AdventureStructure";
import { CreatingActsGuideLink } from "./CreatingActs";
import { DesigningForYourPlayersGuideLink } from "./DesigningForYourPlayers";
import { StartingTheAdventureGuideLink } from "./StartingTheAdventure";

export const AdventuresGuideLink = new ArticleNavLink({
    path: "Adventures",
    name: "Adventures",
    render: (index?: number) => <AdventureGuide index={index} siblings={GuideLinks} />,
    sublinks: [
        AdventureStructureGuideLink,
        CreatingAdventuresGuideLink,
        CreatingActsGuideLink,
        StartingTheAdventureGuideLink,
        DesigningForYourPlayersGuideLink,
    ]
})

const AdventureGuide = (props: ArticleProps) => (
    <RulesArticle {...props} root={GuideRoot} link={AdventuresGuideLink}>
        <p>
            Adventuring is the core gameplay in <em>500 After Cataclysm</em> and this part of the GM Guide will give you the tools necessary to craft a compelling adventure for your players.
        </p>
    </RulesArticle>
)