import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { FeminineFirstNamesTable, MasculineFirstNamesTable, CharacterNameGenerator, SurnamesTable } from "../../rules/figures/NamingFigures";
import { CollapsibleSection } from "../../articles/CollapsibleSection";

export const CreatingNPCsGuideLink = new ArticleNavLink({
    path: "#CreatingNPCs",
    name: "Creating NPCs",
    render: () => <CreatingNPCsGuide />
})

const CreatingNPCsGuide = ()=> (
    <section id={CreatingNPCsGuideLink.hash}>
        <h2>{CreatingNPCsGuideLink.name}</h2>
        <p>
            Oftentimes you will want to introduce custom NPCs for your players to interact with. This section contains tables and tools that will help you generate those NPCs. You can either use the automatic generator below, or manually roll from the tables at the end of this section.
        </p>

        <CharacterNameGenerator />

        <p>
            Alternatively, you can create your own name. Names are typically variations of contemporary names, preferring less common names or inspired by something that had an impact on the past (present day real life). Generally names should be somewhat comedic.
        </p>


        <p>
            For each of the tables below, droll a d100 / percentile dice (two d10's are often used, each representing one of the digits).
        </p>        
        <CollapsibleSection header="Male First Names" expandedInitially>
            <MasculineFirstNamesTable />
        </CollapsibleSection>
        
        <CollapsibleSection header="Female First Names" expandedInitially>
            <FeminineFirstNamesTable />
        </CollapsibleSection>

        <CollapsibleSection header="Surnames" expandedInitially>
            <SurnamesTable />
        </CollapsibleSection>
    </section>
)