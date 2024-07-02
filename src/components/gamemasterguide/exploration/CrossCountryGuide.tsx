import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { CrossCountryMajorComplicationDetailsList, CrossCountryEnvironmentalComplicationsTable, CrossCountryMajorComplicationsTable, CrossCountryMinorComplicationsTable, CrossCountryTravelTable, CrossCountryMinorComplicationsDetailsList, CrossCountryEnvironmentalComplicationsDetailsList, CrossCountryMoraleDetailsList } from "../../rules/figures/GuideCrossCountryFigures";
import { Link } from "react-router-dom";

export const CrossCountryGuideLink = new ArticleNavLink({
    name: "Going Cross Country",
    path: "#CrossCountry",
    render: () => <CrossCountryGuide />
});

const CrossCountryGuide = () => (
    <section id={CrossCountryGuideLink.hash}>
        <h2>{CrossCountryGuideLink.name}</h2>
        <p>
            Before reading this guide, be sure to read the <Link to="/Rules/CallToAdventure#CrossCountry">rules chapter on cross country travel</Link> first! This section will provide you with resources and ideas about how to create an engaging cross country adventure for your play group.
        </p>

        <p>
            Below is a table of events to occur when the party is traveling. Roll at d6 at the start of each day. The result on the roll determines what special event or complication occurs that day. Where and when the party encounters the complication (if any) for the day is at your discretion. You may also decide not to determine what occurs on a given day randomly: it may make more sense to decide in advance what, if anything, occurs to your adventurers.
        </p>
        <CrossCountryTravelTable />

        <p>
            Below is a table of major complications that may occur when you roll a 1 on the above table (at normal travel pace).
        </p>
        <CrossCountryMajorComplicationsTable />

        <h4>Major Complications</h4>
        <CrossCountryMajorComplicationDetailsList />

        <p>
            As GM, you are always in control of what major adventure events occur. However, below you will find a table of possible minor complications you might find useful. Roll for or choose one of the options below:
        </p>
        <CrossCountryMinorComplicationsTable />


        <h4>Minor Complications</h4>
        <CrossCountryMinorComplicationsDetailsList />

        <p>
            Here are some options for environmental complications:
        </p>
        <CrossCountryEnvironmentalComplicationsTable />


        <h4>Environmental Complications</h4>
        <CrossCountryEnvironmentalComplicationsDetailsList />

        <h3>Party Morale</h3>
        <p>
            Keeping in good spirits will make traveling easier. Unfortunately, that's not always possible with the stress of travel. There are three different levels of morale the party can be in:
        </p>
        <CrossCountryMoraleDetailsList />
    </section>
)