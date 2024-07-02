import React from "react";
import { ArticleNavLink } from "../articles/navigation/article-navigation/ArticleNavLink";
import { TheCataclysm } from "../theming/texts";

export const WhatsDifferentLink = new ArticleNavLink({
    path: "#WhatsDifferent",
    name: "What's Different?",
    render: () => <WhatsDifferent />
})

const WhatsDifferent = () => (
    <section id={WhatsDifferentLink.path}>
        <h2>{WhatsDifferentLink.name}</h2>
        <p>
            The numerous disasters that befell the earth have left it in a scarred and damaged state; a wasteland. In spite of this, mutant beasts and plants have rapidly adapted with exposure to nuclear and chemical contaminants. Cybernetic experiments that were never meant to see the light of day have spread and multiplied. Humans are no longer the sole intelligent species on earth: Goblins have also carved out a slice of the dwindling pie.
        </p>

        <h3>Goblins? What Are Goblins!?</h3>
        <figure className='float-right' style={{ width: "360px"}}>
            <img src="/public/assets/images/splash/goblin.png" style={{transform: "scaleX(-1)"}} />
            <figcaption className="align-center">A goblin of the Cog Clan</figcaption>
        </figure>
        <p>
            Created sometime before The Catacylsm from bats and released when all hell broke loose, Goblins now live amongst humans, as a part of traveling caravans, and in secluded enclaves of their own. All goblins hail from a mother clan formed sometime after they escaped during The Catacylsm. A goblin's clan represents their lineage and the heraldry is often tattooed onto their body. Each clan has unique customs and preferred mode of life. Some clans live in complete isolation, others are fully or partially integrated with human cultures.
        </p>

        <h3 className="clear">Anything Else?</h3>
        <p>
            Compared to real time, <TheCataclysm /> isn't due for a while. In that time, several technological advancements have been made. Lasers, experimental drugs, and teleporters are all present alongside technology from the present. Despite all these advancements, classical firearms are still effective so you won't be totally out of your depth exploring the wastes.
        </p>
    </section>
)