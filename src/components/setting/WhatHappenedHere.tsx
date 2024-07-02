import React from "react";
import { ArticleNavLink } from "../articles/navigation/article-navigation/ArticleNavLink";
import { TheCataclysm } from "../theming/texts";

export const WhatHappenedHereLink = new ArticleNavLink({
    path: "#WhatHappened",
    name: "What Happened Here?",
    render: () => <WhatHappenedHere />
})

const WhatHappenedHere = () => (
    <section id={WhatHappenedHereLink.path}>
        <h2>{WhatHappenedHereLink.name}</h2>
        <p>
            The world is ruined. At some point unknown in the future, a series of catastrophic events collectively referred to as <TheCataclysm /> took humanity so close to complete collapse that knowledge of the past became fragmented and muddled. Now, 500 years later, magical thinking is once again pervasive amongst the inheritors of the earth. This broken knowledge has spun a new myth. Heroes and adventurers quest the wasteland wielding legendary weapons against foul mutant beasts. Bards travel the highways earning coin playing the keytar. Science is sorcery, the past a myth.
        </p>
        <p>
            Humanity has started to recover, but the devastation of <TheCataclysm /> cannot be overstated. Without the global infrastructure and organization of the past, most pockets of civilization have had to fend for themselves. Raiders, bandits, and highwaymen still prowl the roads. City states vie with one another for resources of the old world.
        </p>
        <p>
            <TheCataclysm /> doesn't happen tomorrow, but sometime in the future. That means some technology out and about is far beyond our current capabilities. Bio-experiments have run rampant, robots are common enforcers, and laser weaponry abounds. You'll find the technology of the wasteland to sometimes be as alien as the society.
        </p>
    </section>
)