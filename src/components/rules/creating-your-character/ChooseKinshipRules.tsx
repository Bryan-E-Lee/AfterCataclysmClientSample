import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Example } from '../../directives/Directives';
import { TheCataclysm } from '../../theming/texts';

export const ChooseKinshipRulesLink = new ArticleNavLink({
    name: 'Choose A Kinship',
    path: '#ChooseKinship',
    render: () => <ChooseKinshipRules />,
    sublinks: [
        {
            name: 'Humans',
            path: '#Humans',
        },
        {
            name: 'Goblins',
            path: '#Goblins',
        },
    ],
});

const ChooseKinshipRules: React.FC = () => (
    <section id={ChooseKinshipRulesLink.hash} key={ChooseKinshipRulesLink.path}>
        <h2>{ChooseKinshipRulesLink.name}</h2>
        <p>
            Your kinship represents your character's origin and, to some extent, what they look like. There are two kinships you can play as listed below:
        </p>
        <section id="Humans">
            <h3>Humans</h3>
            <p>
                Several hundred years ago, humanity set in motion a series of events known as <TheCataclysm />, which scoured the world. Though civilization ended, humanity endured, and the survivors continue to live on and breathe life into the ashes of the old world.
            </p>
        </section>
        <section id="Goblins">
            <h3>Goblins</h3>
            <p>
                The result of genetic experimentation on bats, Goblins were freed from their laboratory constraints during <TheCataclysm />. In the years since, Goblins have grown in number and formed clans living both nomadic and settled lifestyles.
            </p>
        </section>
        <Example header="Chelle's Kinship">
            We've envisioned Chelle as a human bard, but she could just as easily be a goblin if you prefer. Mark her kinship as "Human", or don't if you envision her as a goblin.
        </Example>
    </section>
);
