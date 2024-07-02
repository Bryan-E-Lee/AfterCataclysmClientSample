import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { SizeRules, SizeRulesLink } from './SizeRules';

export const SpaceRulesNavLink = new ArticleNavLink({
    name: 'Space',
    path: '#Space',
    render: () => <SpaceRules />,
    sublinks: [
        SizeRulesLink
    ]
});

const SpaceRules: React.FC = () => (
    <section id={SpaceRulesNavLink.hash} key={SpaceRulesNavLink.path}>
        <h2>{SpaceRulesNavLink.name}</h2>
        <p>
            When describing how much space an object or effect occupies, it is described in hexes. The number of hexes occupied and the shape of the occupied hexes changes how the object occupies its space. For example, both figures below represent an object occupying 7 hexes (a gargantuan object):
        </p>
        <figure className="figure-bordered align-center">
            <img
                src="/public/assets/images/rules/same-area-different-shapes.png"
                alt="Two 7-hex objects with different shapes."
            />
            <figcaption>Two 7-hex objects with different shapes.</figcaption>
        </figure>
        <SizeRules />
    </section>
);
