import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const CombatRoundRulesLink = new ArticleNavLink({
    name: 'Action Rounds',
    path: '#ActionRounds',
    render: () => <CombatRoundRules />
});

const CombatRoundRules: React.FC = () => (
    <section id={CombatRoundRulesLink.hash} key={CombatRoundRulesLink.hash}>
        <h2>{CombatRoundRulesLink.name}</h2>
        <p>
            Action Scenes are performed in rounds which consist of turns for each character participating in the action scene. A round represents about 6 seconds of time from your character's perspective. The next chapter will detail how to perform actions during the players' turn. Action rounds occur in the following manner:
        </p>
        <ol>
            <li>The GM rolls the communal dice.</li>
            <li>
                Players perform their actions simultaneously, resolving them in whichever order they like.
            </li>
            <li>
                NPCs perform their actions simultaneously, under the GM's control and resolving in whatever order the GM likes.
            </li>
            <li>
                Repeat until the action scene ends: all belligerents from all but one faction have been killed, incapacitated, or surrendered.
            </li>
        </ol>
        <p>
            If the players are taken by surprise or ambushed, instead the NPCs will perform their actions first and players will go second.
        </p>
    </section>
);
