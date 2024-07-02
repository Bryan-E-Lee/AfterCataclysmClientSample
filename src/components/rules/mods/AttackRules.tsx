import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const AttackRulesLink = new ArticleNavLink({
    name: "Attacks",
    path: "#Attacks",
    render: () => <AttacksRules />
})

const AttacksRules = () => (
    <section id={AttackRulesLink.hash}>
        <h2>{AttackRulesLink.name}</h2>
        <p>
            Attacks are mods which provide your weapons the ability to use that attack. Attacks can be slotted anywhere, but can only be used from items which have attack slots.
        </p>
        <p>
            A weapon contains no inherent ability to attack; the ability to use an attack comes from the attack mod. Melee weapons must have blades, bludgeons, or spikes attached in order to be wielded, firearms must have ammunition loaded, etc.
        </p>
    </section>
)