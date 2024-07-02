import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Hazard } from "../../../entities/library/hazards/Hazard";
import { HazardBlock } from "../../../entities/library/hazards/HazardBlock";

export const EnvironmentalHazardsGuideLink = new ArticleNavLink({
    name: "Environmental Hazards",
    path: "#EnvironmentalHazards",
    render: () => <EnvironmentalHazardsGuide />
})

const ExampleHazard: Hazard = {
    id: "",
    name: "Sticky Substance",
    description: "Occupies any amount of space. Characters within the sticky substance are unable to move by normal means and must generate sufficient thrust or destroy the substance to escape.",
    rough: true,
    solutions: [
        "Generate thrust to escape the substance.",
        "Destroy the substance chemically or mechanically, removing the hazard."
    ],
    tags: ["Movement"]
}

const EnvironmentalHazardsGuide = () => (
    <section id={EnvironmentalHazardsGuideLink.hash}>
        <h2>{EnvironmentalHazardsGuideLink.name}</h2>
        <p>
            Hazards are environmental effects that pose some harm to the party. Hazards can be recognized by <em>Hazard Blocks</em> which detail what the hazard is and what the intended solutions are.
        </p>
        <figure>
            <HazardBlock hazard={ExampleHazard} />
            <figcaption>
                An example hazard block for a sticky substance.
            </figcaption>
        </figure>
        <p>
            An environmental action scene can contain multiple hazards, so players may have to navigate multiple problems at once.
        </p>
    </section>
)