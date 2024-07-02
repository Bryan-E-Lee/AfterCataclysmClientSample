import React from "react";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { TheCataclysm } from "../../theming/texts";

export const GoblinRulesLink = new ArticleNavLink({
    name: 'Goblins',
    path: '#Goblins',
    render: () => <GoblinRules />
});

const GoblinRules: React.FC = () => (
    <section id={GoblinRulesLink.hash} key={GoblinRulesLink.path}>
        <h2>Goblins</h2>
        <p>
            The result of genetic experimentation on bats, Goblins were freed from their laboratory homes during <TheCataclysm />. In the years since, large numbers live a nomadic life as traveling merchants and craftsmen, but many also choose to live in cities amongst humans. Goblins are similar to humans in demeanor, and are of a variety of dispositions and personalities. If you were to communicate with a Goblin without hearing its higher pitched voice and without being able to see it, you might not even realize you were speaking with a non-human!
        </p>
        <CollapsibleSection header="Physical Attributes" collapsible={false}>
            <ul>
                <li>
                    Goblins are typically between 3½ and 5½ feet tall.
                </li>
                <li>
                    Goblins have snub noses and large, batlike ears which betray their laboratory origins.
                </li>
                <li>
                    Goblin skin tones tend to range between pink and reddish hues in varying shades of gray.
                </li>
                <li>
                    Goblins are immune to hacking damage and the malfunctioning condition.
                </li>
                <li>
                    Goblins have worse vision than a human, being able to see about 2 miles on a clear day and with less clarity.
                </li>
                <li>
                    Goblins can hear better than humans, being able to hear whispers up to about 20 meters (~60 feet) away, normal talking about 100 meters (~300 feet) away, and shouting from 1000 meters away (~3000 feet)
                </li>
            </ul>
        </CollapsibleSection>
        <figure className="align-center">
            <img src="/public/assets/images/splash/goblin.png" />
            <figcaption>
                A goblin wastelander.
            </figcaption>
        </figure>
    </section>
)