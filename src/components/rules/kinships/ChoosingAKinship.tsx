import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const ChoosingAKinshipRulesLink = new ArticleNavLink({
    name: "Choosing A Kinship",
    path: "#ChoosingAKinship",
    render: () => <ChoosingAKinshipRules />,
})

const ChoosingAKinshipRules = () => (
    <section id={ChoosingAKinshipRulesLink.hash} key={ChoosingAKinshipRulesLink.path}>
        <h2>{ChoosingAKinshipRulesLink.name}</h2>
        <p>
            When creating your character, you choose one of the above kinships. Simply note your kinship on your character sheet.
        </p>
        <Example header="Chelle's Kinship">
            We've envisioned Chelle as a human bard, but she could just as easily be a goblin if you prefer. Mark her kinship as "Human", or don't if you envision her as a goblin.
        </Example>
    </section>
)