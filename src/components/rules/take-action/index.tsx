import React from "react";
import { RuleLinks } from "..";
import { ArticleProps } from "../../articles/ArticleProps";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../RulesArticle";
import { AbilityRulesLink } from "./AbilitiesArticle";
import { ActionRulesLink } from "./actions/ActionRules";
import { PassiveRulesLink } from "./Passives";
import { ReactionRulesLink } from "./ReactionRules";
import { DurationRulesLink } from "./DurationRules";
import { StandardActionRulesLink } from "./actions/StandardActionRules";
import { HandRulesLink } from "./actions/HandRules";

export const TakeActionRulesLink = new ArticleNavLink({
    path: 'TakingAction',
    name: 'Taking Action',
    render: (index?: number) => <TakeActionRules index={index} siblings={RuleLinks} />,
    sublinks: [
        AbilityRulesLink,
        ActionRulesLink,
        HandRulesLink,
        StandardActionRulesLink,
        ReactionRulesLink,
        PassiveRulesLink,
        DurationRulesLink,
    ]
});

const TakeActionRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={TakeActionRulesLink}>
        <p>
            A lot has been said so far about who your character is, but nothing has yet been said about how they go about interacting in the world. This chapter will tell you how to do exactly that.
        </p>
    </RulesArticle>
);