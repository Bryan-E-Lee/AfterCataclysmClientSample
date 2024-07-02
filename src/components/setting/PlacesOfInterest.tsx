import React from "react";
import { ArticleNavLink } from "../articles/navigation/article-navigation/ArticleNavLink";
import { TheCataclysm } from "../theming/texts";

export const PlacesOfInterestLink = new ArticleNavLink({
    path: "#PlacesOfInterest",
    name: "Places of Interest",
    render: () => <PlacesOfInterest />
})

const PlacesOfInterest = () => (
    <section id={PlacesOfInterestLink.path}>
        <h2>{PlacesOfInterestLink.name}</h2>
        <p>
            The exact geography and contents of the wasteland are ultimately up to the Game Master to determine, but there are some notable landmarks and other places of interest that exist.
        </p>

        <h3>Tower of Herald</h3>
        <p>
            The <em>Tower of Herald</em> is home to the eponymous Herald, a mysterious wizard living within a lone, ruined skyscraper in the middle of the desert. Nobody has ever seen Herald nor managed to come back from venturing to his tower alive. A relic from before <TheCataclysm />, Herald is kept alive as effectively a brain in a vat.
        </p>
        <p>
            From within his tower, Herald controls and manipulates a fleet of spy drones disguised as birds and insects to eavesdrop on the happenings of the wasteland. He spreads this knowledge free of charge, keeping the residents of the wastes informed of the latest news despite being completely oblivious to his true nature. Herald's ambivalence is his greatest strength. Neutral and unassailable in his skyscraper fortress, Herald's motivations are unclear.
        </p>

        <h3>Necromancer, and the Army of the Damned</h3>
        <p>
            They say the Necromancer comes at night, playing a single ominous note before the melody of slaughter. Wielding the mighty <em>Axe of the Damned</em>, a horde of zombies and faithful acolytes - the titular army - await his beck and call. Pillaging small settlements for corpses, the Necromancer's greater motives remain a mystery to wastelanders.
        </p>
        <p>
            "Necromancer" is more of a title than an individual. Ultimately, the Necromancer is simply a vessel for the <em>Axe of the Damned</em> to control rather than a person with his own goals. The Axe  hungers for blood: it exists solely to cause misery and mayhem and it targets damaged individuals to become the next Necromancer to sustain its grim legacy.
        </p>

        <h3>The Astrozens & Ayasus, the Weeping Star</h3>
        <p>
            "Astrozens", as they call themselves, are the descendents of the astronauts aboard the I.S.S. when <TheCataclysm /> wracked the Earth. Safe from the carnage in space and unable to return home, the Astrozens built a new society cloistered far above the ravaged world beneath.
        </p>
        <p>
            The Astrozens are not entirely localized to the I.S.S. Operating giant semi-autonomous spheres known as "Reapers" by wastelanders, small teams on the ground harvest ancient ruins and return their resources to maintain and enhance the station. After so much time, "I.S.S." slowly morphed into the phonetic "Ayasus", and the regular reentries to supply their hidden ground teams has caused the space station to be called "The Weeping Star" by wastelanders. As the last true bastion of the old ways, the reclusive Astrozen civilization could be a beacon of hope to those mired on the Earth; if only they knew.
        </p>

        <h3>The Shogunate</h3>
        <p>
            The return of civilization and order brought with it criminal enterprise to circumvent the newfound laws. The Shogunate has positioned itself as one of the premier players in black market deals to get around the restrictions of the waste's numerous polities.
        </p>
        <p>
            Controlled by a man calling himself "Shogun", the Shogunate is modeled off a bastardized understanding of Tokugawa's Japan. Its members can be recognized by their slick black suits and crimson ties wearing masks reminiscent of Samurai kabutos. The Shogunate is powerful and controls a large territory; they can never be ignored when smuggling, illicit substances, or violence are involved.
        </p>
    </section>
)