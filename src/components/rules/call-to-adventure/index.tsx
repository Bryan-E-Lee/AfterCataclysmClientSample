import React from "react";
import { ArticleProps } from "../../articles/ArticleProps";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../RulesArticle";
import { RuleLinks } from "..";
import { MoneyRulesLink } from "../equipment/MoneyRules";

export const CallToAdventureRulesLink = new ArticleNavLink({
    path: "CallToAdventure",
    name: "The Call To Adventure",
    render: (index?: number) => <CallToAdventureRules index={index} siblings={RuleLinks} />,
    sublinks: [
        MoneyRulesLink,

    ]
})

const CallToAdventureRules = (props: ArticleProps) => (
    <RulesArticle {...props} link={CallToAdventureRulesLink}>
        <p>
            It's time to go off and adventure into the world! Whether you're searching for forgotten treasure, revenge, or salvation, this chapter will cover the different places you'll go.
        </p>
    </RulesArticle>
)