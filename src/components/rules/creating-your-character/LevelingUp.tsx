import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Directive } from "../../directives/Directives";
import { PerksPerLevelTable } from "../figures/PerksPerLevelTable";
import { NavLink } from "react-router";

export const LevelingUpRulesLink = new ArticleNavLink({
    name: 'Leveling Up',
    path: '#levelingUp',
    render: () => <LevelingUpRules />,
    sublinks: [
        {
            name: "Choosing Perks",
            path: "#ChoosingPerks"
        }
    ]
});

const LevelingUpRules = () => {
    return (
        <section id={LevelingUpRulesLink.hash} key={LevelingUpRulesLink.path}>
            <h2>{LevelingUpRulesLink.name}</h2>
            <p>
                When your character completes an adventure their level will increase by 1, indicating that they've become more capable. Characters start at level 1 and can attain a maximum level of 10 through adventuring. 
            </p>

            <section id="ChoosingPerks" key="#ChoosingPerks">
                <h3>Choosing Perks</h3>
                <p>
                    When you level up, you will sometimes gain a perk. Perks are benefits that make your character unique, conferring special abilities onto your character. You'll gain perks as you level up based on the table below:
                </p>
                <PerksPerLevelTable />
                <p>
                    You can also see a list of all perks <NavLink to="/Library/Perks" target="_blank">here</NavLink>.
                </p>
                <Directive header="Chelle's Perks">
                    <p>
                        Alice has decided that the <NavLink to="/Library/Perks/Shocking" target="_blank">Shocking</NavLink> perk makes the most sense for her vision of Chelle. She marks this down in the <em>Perks</em> section of her character sheet.
                    </p>
                </Directive>
            </section>
        </section>
    )
}