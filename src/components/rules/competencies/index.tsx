import React from "react";
import { RuleLinks } from "..";
import { ArticleProps } from "../../articles/ArticleProps";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../RulesArticle";
import { Example } from "../../directives/Directives";
import { ExpertiseNavLink } from "./ExpertiseRules";
import { CustomCompetenciesNavLink } from "./CustomCompetencyRules";
import { GainingCompetenceNavLink } from "./GainingCompetenceRules";
import { RollingCompetenciesNavLink } from "./RollingCompetenciesRules";
import { TheCataclysm } from "../../theming/texts";
import { CreateACompetentCharacterRulesLink } from "./CreatingACompetentCharacter";

export const CompetencyRulesLink = new ArticleNavLink({
    path: "Competencies",
    name: "Competencies",
    render: (index?: number) => <CompetencyRules index={index} siblings={RuleLinks} />,
    sublinks: [
        ExpertiseNavLink,
        CustomCompetenciesNavLink,
        GainingCompetenceNavLink,
        RollingCompetenciesNavLink,
        CreateACompetentCharacterRulesLink,
    ]
})

const CompetencyRules = (props: ArticleProps) => (
    <RulesArticle {...props} link={CompetencyRulesLink}>
        <p>
            Everybody in the wasteland, you included, has different knowledge and expertise. Competencies represent things that you are capable of performing with a fair amount of competency. A competency has a name, a category, and a description of what having this competency means.
        </p>
        <Example>
            If you are competent at knowing the customs of high society, you know the proper etiquette for upper class parties. A character without that competency will not know those same customs and so the GM should rule against them correctly aknowledging a visiting dignitary and similar upper class functions.
        </Example>

        <p>
            To use your competencies, simply explain how you use your competency as part of your roleplaying. Competencies describe things that you can just do. Give an explanation for why your competency applies and, if it's reasonable, it should work. Unlike some other roleplaying games, you will very rarely have to roll to succeed at your competency. Competencies are primarily used to create roleplaying solutions to problems your encounters.
        </p>

        <Example>
            <p>
                Chelle is competent at <em>Recent History</em>, which means that she knows a fair amount about events that have occurred after <TheCataclysm />. If the party overhears talk about a great warrior of the past, you can invoke her knowledge of <em>Recent History</em> as seen below:
            </p>

            <strong>GM:</strong>&nbsp;As you walk down the main causeway, whispers bubble up through the alleys and stalls; you get the feeling that outsiders are rare here. From the mumblings, you hear a child ask out to their mother...
            <br />

            <strong>Child (GM):</strong>&nbsp;Mother look! Strangers, like the story about Valhan the Valiant!
            <br />

            <strong>You:</strong>&nbsp;Would Valhan the Valiant have existed after <TheCataclysm />?
            <br />

            <strong>GM:</strong>&nbsp;Yes.
            <br />

            <strong>You:</strong>&nbsp;Alright, then I think Chelle has probably heard of him!
            <br />

            <strong>Chelle (You):</strong>&nbsp;Hello there little one, did you say "Valhan the Valiant"? I didn't realize he had ventured this far north.
            <br />

            <strong>Child (GM):</strong>&nbsp;Oh yeah! Mom, tell her the story about the time you saw him in town before I was born!
            <br />

            <p>
                Chelle's knowledge of the recent past has now given the party a possible lead on quests and treasure related to the exploits of Valhan the Valiant.
            </p>
        </Example>
    </RulesArticle>
)