import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const HealthRulesLink = new ArticleNavLink({
    path: '#Health',
    name: 'Health',
    render: () => <HealthRules />
})

const HealthRules = () => (
    <section id={HealthRulesLink.hash} key={HealthRulesLink.path}>
        <h2>{HealthRulesLink.name}</h2>
        <p>
            Your health determines how far away you are from death - an especially horrible fate in the wasteland. Health is represented by a number of hit points and you have a maximum number of hit points equal to 15 plus 3 times your level plus 2 times the highest level between your athletics and melee skills.
            <Example>
                A level 4 character with an Athletics skill of 5 has <br /> 15 + (3 &#215; 4) + (2 &#215; 5) = 37 Hit Points
            </Example>
        </p>
        <p>
            As your character takes damage, they will lose hit points equal to the damage dealt. Your character can restore their hit points back to full by seeking medical attention or by resting. When a character rests, they restore half of their hit points for each night rested. Medical services can also be rendered by your character, allied characters, or by medical practitioners in exchange for chips.
        </p>
        <p>
            If your character falls to 0 health, they are either put down or killed depending on what the GM finds appropriate given the circumstances. A character that is down can be stabilized so long as they receive assistance from their allies, but they must receive medical attention of some sort to restore their health above 0. A dead character is dead, and that character's player will need to create a new character to play with for the rest of the adventure.
        </p>
    </section>
)