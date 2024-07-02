import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Example } from '../../directives/Directives';
import { EmpowermentTable } from '../figures/EmpowermentTable';
import { Link } from "react-router-dom";

const IncreasingDecreasingDamage = new ArticleNavLink({
    name: 'Increasing & Decreasing Damage',
    path: '#IncreasingDecreasingDamage',
});

export const DamageRulesLink = new ArticleNavLink({
    name: 'Damage',
    path: '#Damage',
    render: () => <DamageRules />,
    sublinks: [IncreasingDecreasingDamage]
});

const DamageRules: React.FC = () => (
    <section id={DamageRulesLink.hash}>
        <h2>{DamageRulesLink.name}</h2>
        <p>
            To determine how much damage an attack or spell deals, you take the damage of the mod used to deal that damage and subtract the opponent's relevant resistances. For more information about the different types of damage and which defensive stats reduce them, see the chapter on <Link to="/Rules/Equipment#ArmorResilience">Armor & Resilience</Link>.
        </p>
        <Example>
            <p>
                Chelle fires a <Link to="/Library/Items/Jacketed+Rounds" target="_blank">Jacketed Round</Link> from her rifle at Bob, who has a total of 2 armor. Because a Jacketed Round deals 8 percussive damage, Bob takes 6 damage from the attack.
            </p>
        </Example>
        <section id={IncreasingDecreasingDamage.hash}>
            <h3>{IncreasingDecreasingDamage.name}</h3>
            <p>
                If an effect instructs you to increase the damage of an effect but does not specify the type of damage to increase, you choose a damage type from among the damage dealt by the effect to increase by that amount.
            </p>
            <p>
                Additionally, whenever you are instructed to double or halve damage (or apply any other multiplier to damage), damage is doubled or halved <em>after</em> subtracting armor and resistances from the damage unless otherwise specified. Whenever a value is halved, round down.
            </p>
        </section>
    </section>
);
