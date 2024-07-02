import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Link } from "react-router-dom";

export const SpellRulesLink = new ArticleNavLink({
    name: "Spells",
    path: "#Spells",
    render: () => <SpellRules />
})

const SpellRules = () => (
    <section id={SpellRulesLink.hash}>
        <h2>{SpellRulesLink.name}</h2>
        <p>
            Spells are mods which provide your character the ability to cast that spell. Spells can only be slotted into a spell focus or a wand unless a mod permits them to be slotted elsewhere. The act of casting a spell is covered in greater detail in the chapter on casting spells as a <Link to="/Rules/TakeAction#Spells">primary action</Link>.
        </p>
    </section>
)