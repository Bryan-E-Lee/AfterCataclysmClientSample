import React from "react"
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink"
import { Example } from "../../directives/Directives"
import { EmpowermentTable } from "../figures/EmpowermentTable"


export const EmpoweredAbilitiesRulesLink = new ArticleNavLink({
    name: "Empowered Abilities",
    path: "#EmpoweredAbilities",
    render: () => <EmpoweredAbilitiesRules />
})

const EmpoweredAbilitiesRules = () => (
    <section id={EmpoweredAbilitiesRulesLink.hash}>
        <h3>{EmpoweredAbilitiesRulesLink.name}</h3>
        <p>
            Some abilities will mention that they are <em>Empowered</em>. When an ability is empowered, you use the empowerment bonus of the relevant skill to increase the power of the ability. Unless otherwise specified, add the empowerment bonus to any damage the ability deals, otherwise, add the empowerment bonus where specified. You can empower only one ability per round. Use the table below to determine your empowerment bonus for a skill:
        </p>
        <EmpowermentTable header="Empowerment Bonus" />
        <p>
            Sometimes, you will be instructed to empower an ability multiple times. To do this, add the empowerment bonus from the table as many times as instructed.
        </p>
        <Example>
            You roll a Jackpot! when firing your handgun with a Firearms skill of 10. You see that the trigger allows "Empower x2". If you choose to empower this attack, it will deal an additional 5+5 (10) damage.
        </Example>
    </section>
)