import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Directive } from "../../directives/Directives";
import { Link } from "react-router-dom";

export const CreateACompetentCharacterRulesLink = new ArticleNavLink({
    name: "Create a Competent Character",
    path: "#CreateACompetentCharacter",
    render: () => <CreateACompetentCharacterRules />
})

const CreateACompetentCharacterRules = () => (
    <section id={CreateACompetentCharacterRulesLink.hash} key={CreateACompetentCharacterRulesLink.path}>
        <h2>{CreateACompetentCharacterRulesLink.name}</h2>
        <p>
            When you create a character, give them four competencies <em>or</em> two competencies and one expertise (that expertise is a different competency). You can view a list of all competencies <Link to="/Library/Competencies">here</Link>.
        </p>
        <Directive header="Chelle's Competencies">
            As an outgoing young bard, we imagined Chelle to be a competent <em>Dancer</em>, knowledgeable about <em>Recent History</em>, and an expert at <em>Playing an Instrument</em>. If you agree with us, mark her down with two competencies in <em>Dancing</em> and <em>Recent History</em> and <em>expertise</em> in Playing an Instrument.
        </Directive>
    </section>
)