import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";
import { Link } from "react-router-dom";

const SplittingMinionsLink = new ArticleNavLink({ name: 'Splitting Your Minions', path: '#' })

export const MinionRulesLink = new ArticleNavLink({
    name: 'Commanding Minions',
    path: '#Minions',
    render: () => <HordeRules />,
    sublinks: [
        SplittingMinionsLink
    ]
});

const HordeRules: React.FC = () => (
    <section id={MinionRulesLink.hash} key={MinionRulesLink.path}>
        <h2>{MinionRulesLink.name}</h2>
        <p>
            Minions are helper NPCs that you can control using your command skill. As your command skill increases, you will be able to control more minions, each of which becomes a part of your minion horde. Your minion horde occupies a single hex. When you use your command skill to control a minion, you use one of your minions' abilities, and it originates from your minion horde.
        </p>
        <p>
            Your horde is treated as a singular entity by enemies. They can target your horde as one character, but not any particular minion in your horde. When your horde is dealt damage, you choose a legal target in that horde to take that damage. If the damage would deal more damage than that minion's health, the remaining damage must be assigned to the next legal minion in your horde, if one exists. Your minion horde is a legal target of an ability so long as at least one living minion in the horde could be a legal target.
        </p>
        <Example>
            You control a minion horde with a <Link to="/Library/Minions/Blaster+Bot">blaster bot</Link> and a <Link to="/Library/Minions/Bruiser+Bot">bruiser bot</Link>. The horde is hit with an attack that deals 6 kinetic damage. You may assign all 6 kinetic damage to the blaster bot, which would bring it down. The remaining 1 damage would have to be assigned to your bruiser bot, as it is still a legal target for the damage. Alternatively, if you assigned all the damage to your bruiser bot first, it would survive the attack because its armor would reduce the damage received, meaning no damage would need to be assigned to the blaster bot.
        </Example>
        
        <SplittingMinions />
    </section>
);

const SplittingMinions: React.FC = () => (
    <section id={SplittingMinionsLink.hash}>
        <h3>{SplittingMinionsLink.name}</h3>
        <p>
            Sometimes it makes narrative sense to split your minions up rather than have them move together as part of your horde. When you need to spit a minion off to act on its own, you can still control it, but it is not considered a part of your horde; you cannot use any of its abilities as a primary action, it cannot be affected by other abilities, and you cannot do anything besides have it move or perform simple actions (such as grabbing an object).
        </p>
    </section>
);