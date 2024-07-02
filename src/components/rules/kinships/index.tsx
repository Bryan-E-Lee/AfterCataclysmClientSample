import React from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { RulesArticle } from '../RulesArticle';
import { GoblinRulesLink } from './GoblinRules';
import { HumanRulesLink } from './HumanRules';
import { ChoosingAKinshipRulesLink } from './ChoosingAKinship';

export const KinshipRulesLink = new ArticleNavLink({
    path: 'Kinships',
    name: 'Kinships',
    render: (index?: number) => <KinshipRules index={index} siblings={RuleLinks} />,
    sublinks: [
        HumanRulesLink,
        GoblinRulesLink,
        ChoosingAKinshipRulesLink,
    ]
});

const KinshipRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={KinshipRulesLink}>
        <p>
            Your kinship is first and foremost an aesthetic choice. There are slight perceptual differences in the abilities of humans and goblins but these are not represented by mechanical differences. Kinship can be the appropriate choice for any type of character  you envision, so choose first and foremost the kinship you feel like playing rather than trying to pick one that seems to be the  "best".
        </p>
    </RulesArticle>
)