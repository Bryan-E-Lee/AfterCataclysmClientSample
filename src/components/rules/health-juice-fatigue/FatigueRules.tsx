import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const FatigueRulesLink = new ArticleNavLink({
    path: "#Fatigue",
    name: "Fatigue",
    render: () => <FatigueRules />
})

const FatigueRules = () => {
    return (
        <section id={FatigueRulesLink.hash}>
            <h2>{FatigueRulesLink.name}</h2>
            <p>
                Things get tiring out in the wasteland. Whenever you fire a gun, it will eventually need cleaning. When you swing a sword, it will eventually need sharpening. When you finish a hard day of adventuring, your body will need rest as well. Fatigue tracks how much wear and tear you and your equipment have sustained, and you will need to take a break to relieve your fatigue.
            </p>
            <p>
                Characters normally have 
            </p>
        </section>
    )
}