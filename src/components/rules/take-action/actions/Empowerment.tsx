import React from "react"
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink"
import { EmpowermentTable } from "../../figures/EmpowermentTable"

export const EmpowerementRulesLink = new ArticleNavLink({
    name: 'Empowerement',
    path: '#Empowerment'
})

export const EmpowermentRules = () => {
    <section id={EmpowerementRulesLink.hash} key={EmpowerementRulesLink.path}>
        <h3>{EmpowerementRulesLink.name}</h3>
        <p>
            Sometimes an ability will indicate that it uses an Empowerment Bonus
            when certain rolls are hit. An Empowerment Bonus is based on the skill
            used for that ability and can be found in the table below:
        </p>
        <EmpowermentTable header="Empowerment Bonus" bonusLabel="Bonus" />
        <p>
            Sometimes, you will be instructed to empower an attack multiple times. To
            do this, add the bonus from the table as many times as instructed.
        </p>
    </section>   
}