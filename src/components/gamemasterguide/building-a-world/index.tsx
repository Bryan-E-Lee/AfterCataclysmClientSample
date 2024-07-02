import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../../rules/RulesArticle";
import { ArticleProps } from "../../articles/ArticleProps";
import { GuideRoot } from "../GuideRoot";
import { GuideLinks } from "..";
import { CreatingNPCsGuideLink } from "./CreatingNPCs";

export const BuildingAWorldGuideLink = new ArticleNavLink({
    path: "CreatingAWorld",
    name: "Creating A World",
    render: (index?: number) => <BuildingAWorldGuide index={index} siblings={GuideLinks} />,
    sublinks: [
        CreatingNPCsGuideLink,
    ]
})

const BuildingAWorldGuide = (props: ArticleProps) => (
    <RulesArticle {...props} root={GuideRoot} link={BuildingAWorldGuideLink}>
        <p>
            This section of the guide will provide you with tools for generating new, random content for your players.
        </p>
    </RulesArticle>
)