import React from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { RulesArticle } from '../RulesArticle';
import { CombatRoundRulesLink } from './CombatRoundsRules';
import { CoverPositioningRulesLink } from './CoverPositioningRules';
import { DamageRulesLink } from './DamageRules';
import { TargetingRulesLink } from './VisionTargetingRules';
import { EmpoweredAbilitiesRulesLink } from './EmpoweredAbilities';

export const ActionScenesRulesLink = new ArticleNavLink({
    path: 'Action',
    name: 'Action Scenes',
    render: (index?: number) => <CombatRules index={index} siblings={RuleLinks} />,
    sublinks: [
        CombatRoundRulesLink,
        DamageRulesLink,
        EmpoweredAbilitiesRulesLink,
        CoverPositioningRulesLink,
        TargetingRulesLink,
    ]
});

const CombatRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={ActionScenesRulesLink}>
        <p>
            On your adventures, you will sometimes come across challenges which require more precise timekeeping. When you encounter an avalanche while ascending a mountain or raiders attempting to rob you, an action scene begins. This chapter will detail how to resolve these types of conflicts.
        </p>
    </RulesArticle>
);