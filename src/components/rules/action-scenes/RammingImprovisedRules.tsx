import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

const RammingRulesLink = new ArticleNavLink({ name: 'Ramming', path: '#Ramming' });
const ImprovisedWeaponsRulesLink = new ArticleNavLink({ name: 'Improvised Weapons', path: '#ImprovisedWeapons' });

export const RammingImprovisedRulesLink = new ArticleNavLink({
    name: 'Ramming & Improved Weapons',
    path: '#RammingImprovised',
    render: () => <RammingImprovisedRules />,
    sublinks: [RammingRulesLink, ImprovisedWeaponsRulesLink]
});

const RammingImprovisedRules: React.FC = () => (
    <section id={RammingImprovisedRulesLink.hash}>
        <h2>{RammingImprovisedRulesLink.name}</h2>
        <section id={RammingRulesLink.hash}>
            <h3>{RammingRulesLink.name}</h3>
            <p>
                Vehicles and other objects impart force to anything they hit,
                and characters can tackle other entities using their body as a
                weapon. When an object attempts to enter the same hex as
                another, it will impact and damage that hex's occupants and
                itself. Whenever one object impacts another, both entities are
                damaged equal to the number of hexes traveled by that entity,
                plus three times its size in hexes occupied (tiny entities deal
                no ramming damage). All damage caused by ramming is percussive
                unless otherwise specified or as determined by the GM. For
                example, the GM might declare that an avalanche deals a mix of
                percussive and cryo damage.
            </p>
        </section>
        <section id={ImprovisedWeaponsRulesLink.hash}>
            <h3>{ImprovisedWeaponsRulesLink.name}</h3>
            <p>
                When using an improvised weapon, such as a rock, the attack
                deals 2 percussive damage plus the attacker's athletics score. The
                distance the item can be thrown is equal to their athletics
                score in hexes. Picking up an improvised weapon counts as an
                object interaction, and a character must have a hand available
                to grab the improvised weapon. When used as a melee weapon, the
                improvised weapon is treated as melee for all benefits and
                drawbacks granted to melee attacks, and likewise for ranged
                attacks.
            </p>
        </section>
    </section>
);
