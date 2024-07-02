import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const EitherOrChallengeRulesLink = new ArticleNavLink({
    name: 'Either / Or Challenges',
    path: '#EitherOr',
    render: () => <EitherOrChallengeRules />
});

const EitherOrChallengeRules: React.FC = () => (
    <section id={EitherOrChallengeRulesLink.hash} key={EitherOrChallengeRulesLink.path}>
        <h2>{EitherOrChallengeRulesLink.name}</h2>
        <p>
            Sometimes the GM might want to challenge a player with something that uses one of two skills. In these scenarios the player simply chooses which skill they want to use before rolling. For example, if the GM issues a challenge of "Roll Athletics or Explosives", then the player selects which of those skills they wish to pass the challenge with before rolling any dice, and then proceeds with the challenge as usual.
        </p>
    </section>
);
