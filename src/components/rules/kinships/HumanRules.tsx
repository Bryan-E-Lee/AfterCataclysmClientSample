import React from "react";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { TheCataclysm } from "../../theming/texts";

export const HumanRulesLink = new ArticleNavLink({
    name: 'Humans',
    path: '#Humans',
    render: () => <HumanRules />
});

const HumanRules: React.FC = () => (
    <section id={HumanRulesLink.hash} key={HumanRulesLink.path}>
        <h2>Humans</h2>
        <p>
            Several hundred years ago, humanity initiated a series of events known as <TheCataclysm />, which scoured the world. Though civilization ended, humanity endured, and the survivors continue to live on and create new settlements in the ashes of the old world. Humans in 500 AC are more or less the same as you and your friends.
        </p>
        <CollapsibleSection header="Physical Attributes" collapsible={false}>
            <ul>
                <li>
                    Humans are typically between 5 and 7 feet tall.
                </li>
                <li>
                    Humans come in all skin tones found on living humans today.
                </li>
                <li>
                    Humans are immune to hacking damage and the malfunctioning condition.
                </li>
                <li>
                    Humans have better eyesight than goblins, being able to see about 3 miles on a clear day and with more clarity than a goblin.
                </li>
                <li>
                    Humans cannot hear as well as Goblins, being able to hear whispers at about 5 meters away (~15 feet) normal talking only about 20 meters away (~60 feet), and shouting from about 200 meters away (~600 feet).
                </li>
            </ul>
        </CollapsibleSection>
        <figure className="align-center">
            <img src="/public/assets/images/splash/human.png" />
            <figcaption>
                A human wastelander.
            </figcaption>
        </figure>
    </section>
);