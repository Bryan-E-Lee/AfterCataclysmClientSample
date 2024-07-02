import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const CollaborativeChallengeRulesLink = new ArticleNavLink({
    name: 'Collaborative Challenges',
    path: '#CollaborativeChallenges',
    render: () => <CollaborativeChallengeRules />
});

const CollaborativeChallengeRules: React.FC = () => (
    <section id={CollaborativeChallengeRulesLink.hash} key={CollaborativeChallengeRulesLink.path}>
        <h2>{CollaborativeChallengeRulesLink.name}</h2>
        <p>
            A collaborative challenge is one that challenges two or more party members. When working together, each player in the party performs the challenge using their respective rhetoric or skill. If more than half the party passes the challenge, the challenge succeeds. If more than half the party fails the challenge, the challenge fails. On any other outcome, the party succeeds at cost.
        </p>
    </section>
);
