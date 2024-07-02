import React from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { RulesArticle } from '../RulesArticle';
import { RhetoricalStrategiesNavLink } from './RhetoricalStrategies';
import { ImprovingRhetoricRulesNavLink } from './IncreasingRhetoricalSkills';

export const SocialInteractionRulesLink = new ArticleNavLink({
    render: (index?: number) => <SocialInteractions index={index} siblings={RuleLinks} />,
    path: 'SocialInteractions',
    name: 'Social Interactions',
    sublinks: [
        RhetoricalStrategiesNavLink,
        ImprovingRhetoricRulesNavLink,
    ]
});

const SocialInteractions: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={SocialInteractionRulesLink}>
        <p>
            As you journey, you will come across many people with their own motivations, desires, goals, and histories. Most of these encounters will be non-violent. In order to obtain information, earn trust, and persuade these people to work with you, you will need to be able to pass social challenges to achieve your goals.
        </p>
    </RulesArticle>
);