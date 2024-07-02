import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { CharacterFlawsTable, CharacterMotivationsTable, ConflictResponsesTable, MajorLifeExperiencesTable, WorldPerspectivesTable } from "../figures/CharacterGenerationTables";

export const CreatingAConceptRulesLink = new ArticleNavLink({
    name: "Creating A Concept",
    path: "#CreatingAConcept",
    render: () => <CreatingAConceptRules />,
})

const CreatingAConceptRules = () => (
    <section id={CreatingAConceptRulesLink.hash} key={CreatingAConceptRulesLink.path}>
        <h2>{CreatingAConceptRulesLink.name}</h2>
        <p>
            Before you do anything else with your character, you'll need to create a concept for who they are. How exactly you go about that is your own business, but below you will find some questions and tables which you can use to randomly generate character traits, take inspiration for your own traits, or completely ignore.
        </p>

        <h4>What motivates my character?</h4>
        <p>
            Chelle is motivated to explore! She wants to go out and see the world. Mark that as a motivation on her character sheet, create different motivations for her, or roll on the table below to see what comes up.
        </p>
        <p><CharacterMotivationsTable /></p>

        <h4>What flaws does my character have?</h4>
        <p>
            Chelle is easily sidetracked with small concerns; she likes taking time to listen to every story but can have difficulty seeing how all of the different chapters come together. Mark that as a flaw on her character sheet, create different flaws for her, or roll on the table below to see what comes up.
        </p>
        <p><CharacterFlawsTable /></p>

        <h4>How does my character respond to conflict?</h4>
        <p>
            As a bard and composer, Chelle likes to come up with creative solutions in all walks of life. She sees conflicts as things that can be avoided if people just think about all of the different resources and choices available to them. Mark that as a conflict response on her character sheet, create different conflict responses for her, or roll on the table below to see what comes up.
        </p>
        <p><ConflictResponsesTable /></p>

        <h4>What sort of outlook or perspective does my character have about the world?</h4>
        <p>
            Chelle is still young and optimistic, so she sees people as fundamentally good who might just need a bit of pep in their step. Mark that as a world perspective on her character sheet, create different perspectives for her, or roll on the table below to see what comes up.
        </p>
        <p><WorldPerspectivesTable /></p>

        <h4>What major life experiences has my character had?</h4>
        <p>
            Chelle's family were traveling merchants, so exploration is in her blood. It's only natural that she follow in her parentst' footsteps to continue absorbing all the world has to offer. Mark that as a major life experience on her character sheet, create different experiences for her, or roll on the table below to see what comes up.
        </p>
        <p><MajorLifeExperiencesTable /></p>
    </section>
)