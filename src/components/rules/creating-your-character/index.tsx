import React from 'react';
import { ArticleProps } from '../../articles/ArticleProps';
import { RuleLinks } from '..';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { CreateCharacterStepsRulesLink } from './CreateCharacterStepsRules';
import { RulesArticle } from '../RulesArticle';
import { CreatingAConceptRulesLink } from './CreatingAConcept';

export const CharacterCreationRulesLink = new ArticleNavLink({
    path: 'CharacterCreation',
    name: 'Character Creation',
    render: (index?: number) => <CharacterCreationRules index={index} siblings={RuleLinks} />,
    sublinks: [
        CreateCharacterStepsRulesLink,
        CreatingAConceptRulesLink,
    ]
});

const CharacterCreationRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={CharacterCreationRulesLink}>
        <p>
            A character is somone that interacts with the world as an agent of change. Your character's ability to do so is determined by their knowledge, skills, personality, and equipment.
        </p>
    </RulesArticle>
)