import React from "react";
import { RuleLinks } from "..";
import { ArticleProps } from "../../articles/ArticleProps";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../RulesArticle";
import { HealthRulesLink } from "./HealthRules";
import { JuiceRulesLink } from "./JuiceRules";

export const HealthAndJuiceRulesLink = new ArticleNavLink({
    path: 'HealthJuice',
    name: 'Health & Juice',
    sublinks: [
        HealthRulesLink,
        JuiceRulesLink,
        // FatigueRulesLink,
    ],
    render: (index?: number) => <HealthAndJuiceRules index={index} siblings={RuleLinks} />
});

const HealthAndJuiceRules = (props: ArticleProps) => (
    <RulesArticle {...props} link={HealthAndJuiceRulesLink}>
    </RulesArticle>
)