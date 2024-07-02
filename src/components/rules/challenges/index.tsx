import React from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { GMNote } from '../../directives/Directives';
import { RulesArticle } from '../RulesArticle';
import { AssistingInChallengeRulesLink } from './AssistedChallengeRules';
import { CollaborativeChallengeRulesLink } from './CollaborativeChallengeRules';
import { OpposedChallengeRulesLink } from './OpposedChallengeRules';
import { ChallengeDifficultyRulesLink } from './ChallengeDifficulty';
import { Link } from 'react-router-dom';
import { SocialChallengeRulesLink } from './SocialChallenges';
import { SkillChallengeRulesLink } from './SkillChallengeRules';

export const ChallengeRulesLink = new ArticleNavLink({
    path: 'Challenges',
    name: 'Challenges',
    render: (index?: number) => <ChallengeRules index={index} siblings={RuleLinks} />,
    sublinks: [
        ChallengeDifficultyRulesLink,
        SkillChallengeRulesLink,
        SocialChallengeRulesLink,
        OpposedChallengeRulesLink,
        CollaborativeChallengeRulesLink,
        AssistingInChallengeRulesLink,
    ]
});

const ChallengeRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={ChallengeRulesLink}>
        <p>
            The post-cataclysmic wasteland is unforgiving and you'll find yourself tested more often than not. When you come across circumstances that require you to perform an uncanny feat, the GM will issue a <em>challenge</em>. A challenge is a test to see if you can actually attain the outcome you want. There are three types of challenges you can engage in:
        </p>
        <ul>
            <li>Rhetorical Challenges</li>
            <li>Skill Challenges</li>
            <li>Competency Challenges</li>
        </ul>
        <GMNote>
            Remember, Competency Challenges should be used rarely. It's encouraged to have competencies serve as roleplaying tools rather than to solve challenges.
        </GMNote>
        
        <p>
            When you try to do something and your GM issues a challenge, the GM determines a difficulty for the challenge and announces to the player(s) what is at stake. You should be aware of what you are rolling for and what is likely to happen if you succeed or fail. After announcing the stakes, the GM rolls communal dice for the challenge. Then, the player rolls a hand for the requisite skill, using all dice boons associated with that skill as they like. The GM also rolls a hand with the dice boons associated with their chosen difficulty (covered in more detail in the section on <Link to={ChallengeDifficultyRulesLink.path}>Challenge Difficulty</Link>).
        </p>
        <p>
            If your roll beats the GM's roll without going to tie breaks, then the challenge is passed. If your roll beats the GM's roll on tie breaks, you succeeds with a cost attached (determined by the GM). If your roll loses to the GM's roll on tie breaks, you fail but receive some compensation (determined by the GM). If your roll loses to the GM's roll without going to tie breaks, you simply fail the challenge and receive no compensation.
        </p>
        <GMNote>
            Typically, it only makes sense to challenge players on tasks that they can be reasonably expected to have a chance at failing or succeeding. If a character has downloaded information from a computer onto a drive several times before and has a high engineering skill, it doesn't require an engineering challenge to see if they can accomplish this task. Likewise, it may not make sense to let a character with no athletics training attempt a 2 hour marathon. Issue challenges when it makes sense that the character could succeed or fail under reasonable circumstances; rolling for the sake of rolling can bog down the pace of the game.
        </GMNote>
    </RulesArticle>
)