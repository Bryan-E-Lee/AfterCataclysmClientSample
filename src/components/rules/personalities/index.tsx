import React from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { RulesArticle } from '../RulesArticle';
import { GainingTraitsRulesLink } from './GainingTraits';
import { LosingTraitsRulesLink } from './LosingTraits';
import { Link } from "react-router-dom";
import { CraftPersonalityRulesLink } from './CraftingYourPersonality';

export const PersonalityRulesLink = new ArticleNavLink({
    path: 'Personalities',
    name: 'Personalities',
    render: (index?: number) => <PersonalityRules index={index} siblings={RuleLinks} />,
    sublinks: [
        GainingTraitsRulesLink,
        LosingTraitsRulesLink,
        CraftPersonalityRulesLink,
    ]
});

const PersonalityRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={PersonalityRulesLink}>
        <p>
            Your character's personality determines how you are perceived in the wasteland. Different personalities will change how you interact with other characters and can enhance (or detract!) from your ability to engage in dialogue and diplomacy. Some personality traits will give you additional options when speaking, others will give you boosts to verbal challenges and your ability to pass those challenges, and others can directly change the course and subject of conversation.
        </p>
        <p>
            You can view the complete the complete list of Personality Traits <Link to="/Library/PersonalityTraits" target="_blank">here</Link>.
        </p>
    </RulesArticle>
);