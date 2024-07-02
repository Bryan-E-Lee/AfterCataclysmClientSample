import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const LosingTraitsRulesLink = new ArticleNavLink({
    name: 'Losing Traits',
    path: '#LosingTraits',
    render: () => <LosingTraits />
});

const LosingTraits: React.FC = () => (
    <section id={LosingTraitsRulesLink.hash} key={LosingTraitsRulesLink.path}>
        <h2>{LosingTraitsRulesLink.name}</h2>
        <p>
            You can lose traits when your character stops behaving in a certain way. Usually this is because circumstances have caused your character to grow (or regress!) in some manner. Whatever the case may be, when a trait is no longer applicable, the GM should remove it from your list of traits. Alternatively, if you feel your character no longer behaves in a manner consistent with one of their traits, you can request the GM remove it from your character.
        </p>
    </section>
);