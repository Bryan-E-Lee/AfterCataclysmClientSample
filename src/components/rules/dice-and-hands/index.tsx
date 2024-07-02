import React from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { RulesArticle } from '../RulesArticle';
import { ActionRollsNavLink } from './ActionRollRules';
import { ActionRollRulesLink } from './TheRollsRules';
import { AdvantageDisadvantageNavLink } from './AdvantageDisadvantage';
import { ReflexRollsNavLink } from './ReflexRollRules';
import { DeclaringRollsNavLink } from './DeclaringRolls';

export const DiceAndHandsRulesLink = new ArticleNavLink({
    path: 'Dice',
    name: 'Dice',
    render: (index?: number) => <DiceAndHandRules index={index} siblings={RuleLinks} />,
    sublinks: [
        ActionRollsNavLink,
        ActionRollRulesLink,
        DeclaringRollsNavLink,
        ReflexRollsNavLink,
        AdvantageDisadvantageNavLink
    ]
});

const DiceAndHandRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={DiceAndHandsRulesLink}>
        <p>
            500 A.C. uses six-sided dice (d6) to determine the outcome of effects. There are two different ways you will roll the dice during play:
        </p>
        <ul>
            <li>Action Rolls</li>
            <li>Reflex Rolls</li>
        </ul>
    </RulesArticle>
)