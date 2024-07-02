import React from "react";
import { RuleLinks } from "..";
import { ArticleProps } from "../../articles/ArticleProps";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../RulesArticle";
import { FriendRulesLink } from "./FriendRules";
import { EnemyRulesLink } from "./EnemyRules";

export const PartyRulesLink = new ArticleNavLink({
    path: 'TheParty',
    name: 'The Party',
    render: (index?: number) => <PartyRules index={index} siblings={RuleLinks} />,
    sublinks: [
        FriendRulesLink,
        EnemyRulesLink,
    ]
});

const PartyRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={PartyRulesLink}>
        <p>
            Through some circumstance, you will find yourself alongside a number of companions that make up your party. How you all came to meet is between you and your GM but what's important is that you're now working together to accomplish a common goal.
        </p>
        <p>
            Working with your party is important: you need to consider the desires and motivations of other characters and act or react accordingly. As the GM presents you and the other players conflicts to engage with, think about how you (as your character) feels and how the other player characters are interacting with that conflict. How can you take actions that support their aims while also pursuing your own personal goals? Those sorts of questions will get you into a roleplaying mindset and help everyone at the table have fun while adventuring the wasteland.
        </p>
    </RulesArticle>
);