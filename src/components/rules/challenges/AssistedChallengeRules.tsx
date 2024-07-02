import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { GMNote } from '../../directives/Directives';

export const AssistingInChallengeRulesLink = new ArticleNavLink({
    name: 'Assisting In Challenges',
    path: '#AssistingInChallenges',
    render: () => <AssistingInChallengeRules />
});

const AssistingInChallengeRules: React.FC = () => (
    <section id={AssistingInChallengeRulesLink.hash} key={AssistingInChallengeRulesLink.path}>
        <h2>{AssistingInChallengeRulesLink.name}</h2>
        <p>
            Party members are likely to try and help each other out! When the circumstances make sense, having the assistance of a party member grants the challenged player advantage on their roll.
        </p>
        <GMNote>
            Don't hand out advantage too easily. Players should provide more assistance besides saying "I give my friend help" in order for it to count as an assist.
        </GMNote>
    </section>
);
