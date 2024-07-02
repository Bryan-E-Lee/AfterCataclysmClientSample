import React from "react";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink";
import { Link } from "react-router-dom";

export const InvokeCompetencyRulesLink = new ArticleNavLink({
    name: "Invoke Competency",
    path: "#InvokeCompetency"
})

export const InvokeCompetencyRules = () => (
    <section id={InvokeCompetencyRulesLink.hash}>
        <h3>{InvokeCompetencyRulesLink.name}</h3>
        <p>
            You can always invoke your competency. While you will not normally roll for this action, there are times where that will occur. This is covered in greater detail over in the <Link to="/Rules/Competencies#Invoke">competencies</Link> chapter.
        </p>
    </section>
)