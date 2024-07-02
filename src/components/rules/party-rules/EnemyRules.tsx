import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Link } from "react-router-dom";

export const EnemyRulesLink = new ArticleNavLink({
    name: 'Enemies',
    path: '#Enemies',
    render: () => <EnemyRules />
})

const EnemyRules = () => (
    <section id={EnemyRulesLink.path}>
        <h2>{EnemyRulesLink.name}</h2>
        <p>
            Not all NPCs you come across will be open to diplomatic solutions. The wasteland is a dangerous place in part because several of its residents take what they can by force.
        </p>
        <p>
            When you come across NPCs that are hostile, the GM will have you enter an Action Scene, the details of which are covered in greater detail in the chapter on <Link to="/Rules/ActionScenes#Top">Action Scenes</Link>.
        </p>
    </section>
)