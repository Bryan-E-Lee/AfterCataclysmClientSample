import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Directive, Example } from "../../directives/Directives";
import { ExpertIcon } from "../../icons";
import { Link } from "react-router-dom";

export const ChooseCompetenciesRulesLink = new ArticleNavLink({
    name: "Choose Competencies",
    path: "#ChooseCompetencies",
    render: () => <ChooseCompetenciesRules />
})

const ChooseCompetenciesRules = () => (
    <section id={ChooseCompetenciesRulesLink.hash} key={ChooseCompetenciesRulesLink.path}>
        <h2>{ChooseCompetenciesRulesLink.name}</h2>
        <p>
            Nobody starts an adventure as a total blank slate. Everyone in the wasteland has a history and your past will determine what competencies you have. More information about competencies can be found in the <Link to="/Rules/Competencies#Top">competencies chapter</Link>.
        </p>
        <p>
            A competency represents your ability to perform some task or have knowledge on a topic. If you have a competency, you can appeal for its use to your GM. If you have a competency in something and explain how you use your competency, the GM accepts if it's a reasonable thing someone with that competency could do.
        </p>
        <Example>
            If you are competent at knowing the customs of high society, your character knows the proper etiquette for upper class parties. A character without that competency will not know those same customs and so the GM should rule against them correctly aknowleding a visiting dignitary.
        </Example>

        <p>
            Sometimes you are more than just competent at something. In these scenarios, you are said to have expertise in that subject, noted by this icon: <ExpertIcon />. Expertise in a competency will indicate that you have an even higher attainment and will be capable of greater feats related to that competency.
        </p>
        <Example>
            A character competent at Cooking might be able to prepare tasty and healthy meals, but a character with expertise in Cooking can prepare rare and exotic dishes requiring more precise actions and will learn new recipes and techniques faster than a normal chef.
        </Example>
        <p>
            You start the game with four competencies <em>or</em> two competencies and one expertise (that expertise is a different competency). You can view a list of all competencies <Link to="/Library/Competencies">here</Link>.
        </p>
        <p>
            You can also have custom competencies. These competencies may relate to a subject not covered in the supplied list. To use a custom competency in place of a normal competency to your character, simply pick a name, a description of the competency if you like, a category, and whether you will have expertise in that competency or not. Custom competencies should be agreed with your GM beforehand.
        </p>
        <p>
            Don't worry if you didn't get all the competencies you wanted, as you adventure and learn new things, you can learn new competencies or gain expertise in existing competencies.
        </p>

        <Directive header="Chelle's Competencies">
            As an outgoing young bard, Chelle's is a competent <em>Dancer</em>, has knowledge of <em>Recent History</em>, and expertise at <em>Playing an Instrument</em>. 
        </Directive>
    </section>
)