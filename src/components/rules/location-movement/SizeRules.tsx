import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const SizeRulesLink = new ArticleNavLink({
    name: 'Size',
    path: '#Size',
    render: () => <SizeRules />
});

export const SizeRules: React.FC = () => (
    <section id={SizeRulesLink.hash} key={SizeRulesLink.path}>
        <h3>{SizeRulesLink.name}</h3>
        <p>
            Objects can belong to one of the following size categories based on how many hexes they occupy:
        </p>
        <dl>
            <dt>Small</dt>
            <dd>
                Any number of small entities can be found in a hex. It's up to your GM how many small entities can occupy a hex.
            </dd>

            <dt>Medium</dt>
            <dd>
                Medium enemies occupy their hex, but friendly characters can still move through the occupied hex. Unless otherwise specified, this is the normal size for PCs and NPCs.
            </dd>

            <dt>Large</dt>
            <dd>Large entities occupy their entire hex, and their allies cannot move through their hex.</dd>

            <dt>Gargantuan</dt>
            <dd>
                Gargantuan entities occupy multiple hexes, specified either in the rules or by the GM.
            </dd>
        </dl>
    </section>
);
