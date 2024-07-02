import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const HowToPlayRulesLink = new ArticleNavLink({
    name: 'How to Play',
    path: '#HowToPlay',
    render: () => <HowToPlayRules />
});

const HowToPlayRules = () => (
    <section id={HowToPlayRulesLink.hash} key={HowToPlayRulesLink.path}>
        <h2>{HowToPlayRulesLink.name}</h2>
        <p>
            Players are divided into two groups: the Game Master and the Party. Each member of the party takes on the role of a character living in the 500 A.C. universe and uses the rules described below to interact with the adventure.
        </p>
        <p>
            Typically, the Game Master will describe the scene that the Players find themselves in and the players will act out and describe their actions within the context of the game world. Conflicts in the narrative are resolved through the mechanics referred to later in this document which include, but are not limited to, politics, combat, and creative problem solving.
        </p>
    </section>
);
