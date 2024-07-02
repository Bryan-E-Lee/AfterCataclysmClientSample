import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const OutfittingRulesLink = new ArticleNavLink({
    name: 'Outfiting',
    path: '#Outfitting',
    render: () => <OutfittingRules />
});

const OutfittingRules: React.FC = () => (
    <section id={OutfittingRulesLink.hash} key={OutfittingRulesLink.path}>
        <h2>{OutfittingRulesLink.name}</h2>
        <p>
            The simplest kind of equipment is the kind you keep on your person. Every piece of equipment that can be worn will have a category indicating where it is worn on your body along with "Utility" equipment, which you have readily available for use. Normally, you can only wear one piece of clothing for a given category, though there are two exceptions listed below:
        </p>
        <ul>
            <li>You can wear up to two rings.</li>
            <li>You can wear up to three utility items.</li>
        </ul>
        <p>
            Most equipment you wear is an expression of your personality and purely cosmetic: these types of items will mostly affect how NPCs perceive and react to your presence. If you wear fancy clothes, you might come across as sophisticated and authoritative, but you may also be perceived as disconnected by others. Similarly, wearing weathered clothing might make you look worldly and practical, but it can also make you look unrefined to posh folk. It's important to consider what vibes your outfit gives off.
        </p>
        <p>
            Some pieces of worn equipment provide the ability to perform special tasks. Only equipment you are currently wearing can be used to perform these tasks, so you will need to change outfits and gear in order to make use of items that share an outfit category. In order to change a worn piece of equipment, it takes about 30 seconds to do so unless otherwise specified and you can't move during this time.
        </p>
        <figure>
            <img src="/public/assets/images/rules/goblin-goggles.png" />
            <figcaption>A goblin wearing goggles to improve their accuracy.</figcaption>
        </figure>
    </section>
);
