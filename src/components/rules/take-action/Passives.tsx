import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Link } from "react-router-dom";

export const PassiveRulesLink = new ArticleNavLink({
    name: 'Passives',
    path: '#Passives',
    render: () => <PassiveRules />
});

const PassiveRules: React.FC = () => (
    <section id={PassiveRulesLink.hash}>
        <h2>{PassiveRulesLink.name}</h2>
        <p>
            Passives are abilities that stay in effect until removed. If you are wearing fancy perfume that makes you smell nice, it lasts as long as the ability says it does. The same is true for having an active shield or any other effect granted to you.
        </p>
        <p>
            You gain passive abilities primarily from your gear, perks, and skills. All you need to do is exactly what the passive ability says. If you forget about a passive ability: you snooze, you lose! Don't forget! If you use our <Link to="/Characters">digital character sheets</Link>, you'll always be able to see a list of which passive abilities are currently active.
        </p>
    </section>
);