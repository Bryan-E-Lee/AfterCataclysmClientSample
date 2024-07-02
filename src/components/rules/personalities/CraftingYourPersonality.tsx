import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Directive } from '../../directives/Directives';
import { Link } from 'react-router-dom';

export const CraftPersonalityRulesLink = new ArticleNavLink({
    name: 'Crafting a Personality',
    path: '#PersonalityTraits',
    render: () => <CraftPersonalityRules />
});

const CraftPersonalityRules: React.FC = () => (
    <section id={CraftPersonalityRulesLink.hash} key={CraftPersonalityRulesLink.path}>
        <h2>{CraftPersonalityRulesLink.name}</h2>
        <p>
            When creating a character, choose two Personality Traits from the list with the <em>Positive</em> attribute and mark them on your character sheet.
        </p>
        <Directive header="Giving Chelle a Personality">
            <p>
                We envisioned Chelle as <Link to="/Library/PersonalityTraits/Spunky">Spunky</Link> and <Link to="/Library/PersonalityTraits/Ambitious">Ambitious</Link>. If you feel the same, mark those traits down on your character sheet, or pick two different ones that you think better suit Chelle.
            </p>
        </Directive>
    </section>
);
