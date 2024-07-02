import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const EstablishingScenesRulesLink = new ArticleNavLink({
    name: 'Establishing Scenes',
    path: '#EstablishingScenes',
    render: () => <EstablishingScenesRules />
})

const EstablishingScenesRules = () => (
    <section id={EstablishingScenesRulesLink.hash} key={EstablishingScenesRulesLink.path}>
        <h2>{EstablishingScenesRulesLink.name}</h2>
        <p>
            An establishing scene is designed to introduce players to an area. It can involve being introduced to a new location, or giving context to changes in a familiar one. Establishing scenes give you some basic ideas and prompts about what to expect in an area and what types of activities might prove fruitful. Establishing scenes rarely involve player interactions. Below is an example of an establishing scene your GM might present with you:
        </p>
        <Example>
            <h3>Entering the Tavern</h3>
            <br />
            As you peek inside the tavern, a haze of smoke and alcohol overwhelm your nostrils. Not much activity here, at least not at the moment. A gaunt man works the bar, serving two patrons at various stages of drinking whiskey. A cyborg sits alone at the corner stall, nursing a beer. A human and goblin peer over at you from a distant table before going back to cards and cigarettes.
        </Example>
    </section>
)