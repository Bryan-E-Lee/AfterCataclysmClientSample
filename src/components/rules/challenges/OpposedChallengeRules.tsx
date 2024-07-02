import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const OpposedChallengeRulesLink = new ArticleNavLink({
    name: 'Opposed Challenges',
    path: '#OpposedChallenges',
    render: () => <OpposedChallengeRules />
});

const OpposedChallengeRules: React.FC = () => (
    <section id={OpposedChallengeRulesLink.hash} key={OpposedChallengeRulesLink.path}>
        <h2>{OpposedChallengeRulesLink.name}</h2>
        <p>
            Sometimes, challenges occur between two characters. When this happens, the GM decides which two rhetorics or skills are opposing one another, then the player rolls as normal and the GM rolls using the NPC's dice boons. The character with the better roll receives a favorable outcome. If both characters are still tied after tiebreakers, then PCs beat NPCs. If both characters are PCs or NPCs, then whichever roll maintains the status quo takes priority.
        </p>
    </section>
);
