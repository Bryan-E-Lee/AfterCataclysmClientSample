import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const SkillAbilitiesRulesLink = new ArticleNavLink({
    path: '#SkillAbilities',
    name: 'Skill Abilities',
    render: () => <SkillAbilitiesRules />
})

const SkillAbilitiesRules = () => (
    <section id={SkillAbilitiesRulesLink.hash} key={SkillAbilitiesRulesLink.path}>
        
    </section>
)