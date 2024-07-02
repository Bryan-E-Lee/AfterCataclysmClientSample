import React from 'react';
import { Hand } from '../../../entities/rolls/Roll';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Roll } from '../../figures/Rolls';
import { Example } from '../../directives/Directives';

export const DeclaringRollsNavLink = new ArticleNavLink({
    name: 'Declaring Rolls',
    path: '#DeclaringRolls',
    render: () => <ActionRollsRules />
});

const ActionRollsRules: React.FC = () => (
    <section id={DeclaringRollsNavLink.hash}>
        <h2>{DeclaringRollsNavLink.name}</h2>
        <p>
            If a player has multiple eligible rolls they may declare their dice as any of those rolls. Once declared, the roll cannot be changed.
        </p>
        <Example>
            Sam has rolled the following dice: <Roll roll={new Hand(5, 5, 5, 1, 1)} />. There are five possible rolls Sam can declare with those dice: a Full House (three 5's and two 1's), a Flush (all odds), a Triple (three 5's), a Pair (two 5's), or a different Pair (two 1's). Sam may declare the dice as any of those rolls but, once declared, the dice are only considered to be that roll and none of the others: if Sam declares a Flush, they cannot later declare the roll as a Full House.
        </Example>
    </section>
);


