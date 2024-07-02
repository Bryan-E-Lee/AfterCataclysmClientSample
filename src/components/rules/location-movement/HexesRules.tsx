import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const HexesRulesNavLink = new ArticleNavLink({
    name: 'Hexes',
    path: '#Hexes',
    render: () => <HexesRules />
});

const HexesRules: React.FC = () => (
    <section id={HexesRulesNavLink.hash} key={HexesRulesNavLink.path}>
        <h2>{HexesRulesNavLink.name}</h2>
        <p>
            A hex is a hexagonal unit that comprises a map or grid. Below is a diagram of a hex grid:
        </p>
        <figure className="figure-bordered align-center">
            <img src="\public\assets\images\rules\basic-hexes.png"
                alt="A basic hex grid." />
            <figcaption>A Hex Grid</figcaption>
        </figure>
    </section>
);
