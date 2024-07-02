import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../../rules/RulesArticle";
import { ArticleProps } from "../../articles/ArticleProps";
import { GuideLinks } from "..";
import { GuideRoot } from "../GuideRoot";
import { CustomEnemiesGuideLink } from "./CustomEnemies";
import { CustomHazardsGuideLink } from "./CustomHazards";
import { CustomItemsGuideLink } from "./CustomItems";
import { CustomModsGuideLink } from "./CustomMods";
import { CustomAnythingGuideLink } from "./CustomizeAnything";

export const CustomizationGuideLink = new ArticleNavLink({
    path: "Customization",
    name: "Customization",
    render: (index?: number) => <ExplorationGuide index={index} siblings={GuideLinks} />,
    sublinks: [
        CustomEnemiesGuideLink,
        CustomHazardsGuideLink,
        CustomItemsGuideLink,
        CustomModsGuideLink,
        CustomAnythingGuideLink,
    ]
})

const ExplorationGuide = (props: ArticleProps) => (
    <RulesArticle {...props} root={GuideRoot} link={CustomizationGuideLink}>
        <p>
            The rules and guide exist primarily to inspire you to craft a fun play experience, but you shouldn't feel restricted by them. This chapter will give you advice for creating custom enemies, hazards, mods, items, and more!
        </p>
    </RulesArticle>
)